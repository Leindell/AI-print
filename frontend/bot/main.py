from fastapi import FastAPI, UploadFile, File, Form, Header, HTTPException
from aiogram import Bot, types
from aiogram.types import InputFile
import os
import uvicorn
from typing import List, Optional
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

BOT_TOKEN = os.getenv("BOT_TOKEN")
MANAGER_CHAT_ID = os.getenv("MANAGER_CHAT_ID")
BOT_SECRET = os.getenv("BOT_SECRET", "secret")

if not BOT_TOKEN:
    print("Warning: BOT_TOKEN not set")

bot = Bot(token=BOT_TOKEN) if BOT_TOKEN else None

@app.post("/api/bot/orders")
async def receive_order(
    service_name: str = Form(...),
    service_price: str = Form(...),
    customer_name: str = Form(...),
    phone: str = Form(...),
    telegram_username: str = Form(...),
    quantity: str = Form(...),
    comment: str = Form(None),
    files: List[UploadFile] = File(None),
    x_bot_secret: str = Header(None)
):
    if x_bot_secret != BOT_SECRET:
        raise HTTPException(status_code=403, detail="Invalid secret")

    if not bot or not MANAGER_CHAT_ID:
        return {"status": "error", "message": "Bot not configured"}

    message_text = (
        f"🆕 <b>Новый заказ!</b>\n\n"
        f"📦 <b>Услуга:</b> {service_name}\n"
        f"💰 <b>Цена:</b> {service_price} ₽\n"
        f"🔢 <b>Количество:</b> {quantity}\n\n"
        f"👤 <b>Клиент:</b> {customer_name}\n"
        f"📱 <b>Телефон:</b> {phone}\n"
        f"✈️ <b>Telegram:</b> {telegram_username}\n"
    )
    
    if comment:
        message_text += f"💬 <b>Комментарий:</b> {comment}\n"

    try:
        await bot.send_message(chat_id=MANAGER_CHAT_ID, text=message_text, parse_mode="HTML")
        
        if files:
            for file in files:
                # Reset file pointer just in case
                await file.seek(0)
                # Send document
                await bot.send_document(
                    chat_id=MANAGER_CHAT_ID,
                    document=types.InputFile(file.file, filename=file.filename),
                    caption=f"📎 Файл к заказу от {customer_name}"
                )
                
        return {"status": "success"}
    except Exception as e:
        print(f"Error sending to Telegram: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
