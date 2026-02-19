from __future__ import annotations

import asyncio
import json
import logging
from typing import Optional, List, Tuple

import httpx
from fastapi import BackgroundTasks, FastAPI, File, Form, Header, HTTPException, UploadFile
from fastapi.responses import JSONResponse

from aiogram import Bot, Dispatcher, Router
from aiogram.filters.callback_data import CallbackData
from aiogram.types import (
    BufferedInputFile,
    CallbackQuery,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    InputMediaDocument,
)

from . import config

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# Validate configuration at startup
config.validate_config()

bot = Bot(token=config.BOT_TOKEN)
dp = Dispatcher()

router = Router()
dp.include_router(router)

# Keep reference to uvicorn main loop (FastAPI loop)
MAIN_LOOP: asyncio.AbstractEventLoop | None = None


class OrderStatusCB(CallbackData, prefix="order_status"):
    order_id: str
    status: str


def build_order_message(meta: dict) -> str:
    lines: list[str] = []

    order_id = meta.get("order_id") or meta.get("id") or meta.get("orderId")
    if order_id:
        lines.append(f"🆔 Заказ: {order_id}")

    service = meta.get("service")
    if service:
        lines.append(f"🔧 Услуга: {service}")

    quantity = meta.get("quantity")
    if quantity:
        lines.append(f"📦 Количество: {quantity}")

    price = meta.get("price")
    if price:
        lines.append(f"💰 Цена: {price}")

    deadline = meta.get("deadline")
    if deadline:
        lines.append(f"⏰ Дедлайн: {deadline}")

    contacts = meta.get("contacts")
    if contacts:
        lines.append(f"📞 Контакты: {contacts}")

    comment = meta.get("comment")
    if comment:
        lines.append(f"📝 Комментарий: {comment}")

    return "\n".join(lines) if lines else "🧾 Новый заказ"


def build_order_keyboard(order_id: str) -> InlineKeyboardMarkup:
    accept_cb = OrderStatusCB(order_id=order_id, status="accepted").pack()
    reject_cb = OrderStatusCB(order_id=order_id, status="rejected").pack()

    buttons = [
        InlineKeyboardButton(text="✅ Принять", callback_data=accept_cb),
        InlineKeyboardButton(text="🚫 Отклонить", callback_data=reject_cb),
    ]
    return InlineKeyboardMarkup(inline_keyboard=[buttons])


async def notify_status(
    order_id: str,
    status: str,
    manager_id: int,
    comment: Optional[str] = None,
) -> None:
    endpoint = config.SERVER_STATUS_ENDPOINT
    if not endpoint:
        return

    url = endpoint.format(id=order_id)
    payload: dict[str, object] = {"status": status, "manager_id": manager_id}
    if comment:
        payload["comment"] = comment

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(url, json=payload, timeout=10.0)
            # 404 просто значит “такого endpoint нет” — не критично для бота
            if resp.status_code == 404:
                logger.warning("Status endpoint returned 404 (check backend route): %s", url)
                return
            resp.raise_for_status()
        logger.info("Sent status update for order %s: %s", order_id, status)
    except Exception:
        logger.exception("Failed to send status update to %s", url)


async def process_order(meta: dict, files_data: List[Tuple[str, bytes]]) -> None:
    """
    files_data: [(filename, bytes), ...] — уже прочитанные файлы (не UploadFile!)
    """
    logger.info("Incoming meta keys=%s meta=%s", list(meta.keys()), meta)

    message_text = build_order_message(meta)
    order_id = str(meta.get("order_id") or meta.get("id") or meta.get("orderId") or "unknown")
    keyboard = build_order_keyboard(order_id)

    try:
        if files_data:
            if len(files_data) > 1:
                media: list[InputMediaDocument] = []
                for filename, content in files_data:
                    media.append(
                        InputMediaDocument(
                            media=BufferedInputFile(content, filename=filename or "file")
                        )
                    )

                # 1) Сначала файлы
                await bot.send_media_group(chat_id=config.MANAGER_CHAT_ID, media=media)

                # 2) Потом детали + кнопки
                await bot.send_message(
                    chat_id=config.MANAGER_CHAT_ID,
                    text=message_text,
                    reply_markup=keyboard,
                )

            else:
                filename, content = files_data[0]
                await bot.send_document(
                    chat_id=config.MANAGER_CHAT_ID,
                    document=BufferedInputFile(content, filename=filename or "file"),
                    caption=message_text,
                    reply_markup=keyboard,
                )
        else:
            await bot.send_message(
                chat_id=config.MANAGER_CHAT_ID,
                text=message_text,
                reply_markup=keyboard,
            )
    except Exception:
        logger.exception("Failed to send order to manager")


def schedule_in_main_loop(coro) -> None:
    """
    BackgroundTasks выполняется в threadpool => там нет running loop.
    Поэтому безопасно планируем корутину в главный uvicorn loop.
    """
    if MAIN_LOOP is None:
        raise RuntimeError("MAIN_LOOP is not initialized yet")
    MAIN_LOOP.call_soon_threadsafe(asyncio.create_task, coro)


@router.callback_query(OrderStatusCB.filter())
async def handle_order_status_callback(query: CallbackQuery, callback_data: OrderStatusCB) -> None:
    order_id = callback_data.order_id
    status = callback_data.status
    manager_id = query.from_user.id

    asyncio.create_task(notify_status(order_id, status, manager_id))
    await query.answer(f"Статус заказа {order_id}: {status}")


app = FastAPI(title="Telegram Order Relay Bot")


@app.on_event("startup")
async def on_startup() -> None:
    global MAIN_LOOP
    MAIN_LOOP = asyncio.get_running_loop()
    asyncio.create_task(dp.start_polling(bot))


@app.on_event("shutdown")
async def on_shutdown() -> None:
    await bot.session.close()


@app.post("/api/bot/orders")
async def receive_order(
    background_tasks: BackgroundTasks,
    meta: str = Form(..., description="JSON string describing the order"),
    files: list[UploadFile] = File(default_factory=list, description="One or more files associated with the order"),
    x_bot_secret: str | None = Header(None, alias="X-BOT-SECRET"),
) -> JSONResponse:
    if not x_bot_secret or x_bot_secret != config.BOT_SECRET:
        raise HTTPException(status_code=403, detail="Invalid or missing X-BOT-SECRET header")

    try:
        meta_dict = json.loads(meta)
        if not isinstance(meta_dict, dict):
            raise ValueError("meta must decode to an object")
    except Exception:
        logger.exception("Invalid meta JSON")
        raise HTTPException(status_code=400, detail="Invalid meta JSON")

    # ВАЖНО: читаем файлы СЕЙЧАС, пока UploadFile еще открыт
    files_data: list[tuple[str, bytes]] = []
    for f in files or []:
        content = await f.read()
        files_data.append((f.filename or "file", content))

    # Планируем отправку в главный event loop
    background_tasks.add_task(schedule_in_main_loop, process_order(meta_dict, files_data))

    return JSONResponse(status_code=202, content={"detail": "Order accepted for processing"})
