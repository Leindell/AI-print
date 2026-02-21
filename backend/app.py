"""Flask backend for AI Print Studio website.

Endpoints:
- GET  /api/services
- POST /api/contact
- POST /api/orders (multipart/form-data)

Forwards orders to Telegram bot microservice:
POST http://localhost:8000/api/bot/orders
  header: X-BOT-SECRET
  form: meta=<json>
  files: files=<upload>...

Pricing fix:
For per-page services the total number of prints is quantity * files_count.
Example: A4=10₽, 2 files, 5 copies => 10 * 2 * 5 = 100₽.
"""

from __future__ import annotations

import json
import os
import random
import re
import uuid
from typing import List, Tuple

import requests
from dotenv import find_dotenv, load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename


def _make_public_order_id() -> str:
    return str(random.randint(10000, 99999))


def _normalize_ru_phone(raw: str) -> str | None:
    digits = re.sub(r"\D", "", raw or "")
    if len(digits) == 10:
        return "+7" + digits
    if len(digits) == 11 and digits.startswith("8"):
        return "+7" + digits[1:]
    if len(digits) == 11 and digits.startswith("7"):
        return "+7" + digits[1:]
    return None


def _normalize_tg_username(raw: str) -> tuple[str, str]:
    u = (raw or "").strip()
    if not u:
        return "", ""
    if not u.startswith("@"):  # ensure @
        u = "@" + u.lstrip("@")
    link = f"https://t.me/{u.lstrip('@')}" if u else ""
    return u, link


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    load_dotenv(find_dotenv())

    BOT_SECRET = os.getenv("BOT_SECRET")
    TELEGRAM_SERVICE_URL = os.getenv("TELEGRAM_SERVICE_URL", "http://localhost:8000/api/bot/orders")
    MAX_FILES = int(os.getenv("MAX_FILES", "10"))

    SERVICES = [
        {"title": "Печать фотографий", "description": "Высококачественная печать фотографий любого формата."},
        {"title": "Копировальные услуги и сканирование", "description": "Ч/б и цветное копирование, сканирование."},
        {"title": "Оперативная и офсетная полиграфия", "description": "Визитки, листовки, брошюры, сертификаты."},
        {"title": "Дизайн и реклама", "description": "Разработка макетов и рекламных материалов."},
        {"title": "Печать на одежде и мерче", "description": "Принты, логотипы и надписи на текстиль."},
        {"title": "Онлайн-услуги и доставка", "description": "Отправляйте файлы онлайн и получайте заказ с доставкой."},
    ]

    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    @app.route("/api/services", methods=["GET"])
    def get_services():
        return jsonify(SERVICES)

    @app.route("/api/contact", methods=["POST"])
    def submit_contact():
        data = request.get_json() or {}
        app.logger.info("Received contact submission: %s", data)
        return jsonify({"status": "success"})

    @app.route("/api/orders", methods=["POST"])
    def create_order():
        files = request.files.getlist("files")

        if len(files) > MAX_FILES:
            return (
                jsonify({"status": "error", "field": "files", "message": f"Можно прикрепить максимум {MAX_FILES} файлов."}),
                400,
            )

        service_id = (request.form.get("service_id") or "").strip()
        service_name = (request.form.get("service_name") or request.form.get("service") or "").strip()
        service_price_raw = (request.form.get("service_price") or "").strip()

        customer_name = (request.form.get("customer_name") or "").strip()
        phone_raw = (request.form.get("phone") or "").strip()
        telegram_raw = (request.form.get("telegram_username") or "").strip()

        quantity_raw = (request.form.get("quantity") or "1").strip()
        comment = (request.form.get("comment") or "").strip() or "—"

        try:
            quantity = int(quantity_raw)
            if quantity <= 0:
                quantity = 1
        except ValueError:
            quantity = 1

        phone = _normalize_ru_phone(phone_raw)
        if not phone:
            return (
                jsonify({"status": "error", "field": "phone", "message": "Номер телефона указан неверно. Пример: +7 999 123-45-67"}),
                400,
            )

        telegram_username, telegram_link = _normalize_tg_username(telegram_raw)

        unit_price = None
        total_price = None
        try:
            unit_price = float(str(service_price_raw).replace(",", "."))
            total_price = unit_price * quantity * max(len(files), 1)
        except Exception:
            unit_price = None
            total_price = None

        public_order_id = _make_public_order_id()
        internal_id = uuid.uuid4().hex

        saved_filenames: List[str] = []
        for uploaded in files:
            if uploaded and uploaded.filename:
                filename = secure_filename(uploaded.filename)
                save_path = os.path.join(UPLOAD_FOLDER, f"{internal_id}_{filename}")
                uploaded.save(save_path)
                saved_filenames.append(filename)

        meta = {
            "order_id": public_order_id,
            "service_id": service_id,
            "service": service_name,
            "price": service_price_raw,
            "unit_price": unit_price,
            "total_price": total_price,
            "quantity": quantity,
            "customer_name": customer_name,
            "phone": phone,
            "telegram": telegram_username,
            "telegram_link": telegram_link,
            "comment": comment,
            "files_count": len(saved_filenames),
        }

        files_for_telegram: List[Tuple[str, Tuple[str, object]]] = []
        for filename in saved_filenames:
            saved_path = os.path.join(UPLOAD_FOLDER, f"{internal_id}_{filename}")
            try:
                fh = open(saved_path, "rb")
                files_for_telegram.append(("files", (filename, fh)))
            except Exception as e:
                app.logger.error("Failed to open file for forwarding: %s (%s)", saved_path, e)

        headers = {}
        if BOT_SECRET:
            headers["X-BOT-SECRET"] = BOT_SECRET

        try:
            resp = requests.post(
                TELEGRAM_SERVICE_URL,
                headers=headers,
                data={"meta": json.dumps(meta, ensure_ascii=False)},
                files=files_for_telegram,
                timeout=20,
            )
            resp.raise_for_status()
        except Exception as e:
            app.logger.error("Failed to forward order #%s to bot: %s", public_order_id, e)
        finally:
            for _, (_, fh) in files_for_telegram:
                try:
                    fh.close()
                except Exception:
                    pass

        return jsonify({"status": "success", "orderId": public_order_id})

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
