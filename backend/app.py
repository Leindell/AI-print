"""
Simple backend for the AI Print Studio website.

This Flask application exposes minimal endpoints required by the front‑end
prototype. It provides a JSON list of services and accepts contact form
submissions. The data returned here mirrors the information found in
public listings: categories such as photo centres, copy services,
operational printing and advertising design【339219316284430†L95-L101】. Payment
methods and hours of operation are also documented on the front end.

Run this app with `flask run` from the command line. In a production
environment you would add authentication, persistent storage and
error handling.
"""

from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename
import os
import uuid
from flask_cors import CORS

# Additional imports for Telegram integration
import requests
import json
from dotenv import load_dotenv, find_dotenv

app = Flask(__name__)
# Enable Cross‑Origin Resource Sharing so that the React front end can
# interact with this API when running on a different port during development.
CORS(app)

# Load environment variables from a .env file if present. This allows
# configuration of the Telegram bot without hardcoding secrets into code.
# Use find_dotenv() to locate a .env file in parent directories too.
load_dotenv(find_dotenv())

# Configuration for forwarding orders to the Telegram bot microservice.
# BOT_SECRET is shared with the bot and must match the value in your .env.
BOT_SECRET = os.getenv("BOT_SECRET")
# URL of the Telegram bot service endpoint. Defaults to localhost:8000 if not set.
TELEGRAM_SERVICE_URL = os.getenv("TELEGRAM_SERVICE_URL", "http://localhost:8000/api/bot/orders")

# Static list of services. In a real application these could be stored in
# a database or loaded from a configuration file.
SERVICES = [
    {
        "title": "Печать фотографий",
        "description": "Высококачественная печать фотографий любого формата. Быстрая печать полароид‑фотографий",  # noqa: E501
    },
    {
        "title": "Копировальные услуги и сканирование",
        "description": "Чёрно‑белое и цветное копирование документов, сканирование и цифровой архив.",
    },
    {
        "title": "Оперативная и офсетная полиграфия",
        "description": "Печать визиток, листовок, брошюр, сертификатов и другой продукции.",
    },
    {
        "title": "Дизайн и реклама",
        "description": "Разработка макетов и рекламных материалов, брендинг, фирменный стиль.",
    },
    {
        "title": "Печать на одежде и мерче",
        "description": "Нанесение принтов, логотипов и надписей на футболки, худи и другой текстиль.",
    },
    {
        "title": "Онлайн‑услуги и доставка",
        "description": "Отправляйте файлы онлайн, оплачивайте любым удобным способом и получайте заказ с доставкой.",
    },
]


@app.route("/api/services", methods=["GET"])
def get_services():
    """Return the list of available services as JSON."""
    return jsonify(SERVICES)


@app.route("/api/contact", methods=["POST"])
def submit_contact():
    """Handle contact form submissions.

    This endpoint receives JSON containing a name, email and message. In this
    prototype it simply prints the data to the console and returns success.
    In a real application you might send an email notification or store
    the inquiry in a database.
    """
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    # Here we just log the message. Additional validation could be added.
    app.logger.info("Received contact submission: %s (%s) – %s", name, email, message)
    return jsonify({"status": "success"})


# Directory where uploaded files will be stored.  In a real
# application this path should be configurable and secured.  Here we
# keep uploads inside the backend folder for simplicity.
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/api/orders", methods=["POST"])
def create_order():
    """Handle incoming orders with optional file uploads.

    Clients should send a multipart/form-data request containing one
    or more files under the key `files` and additional fields such as
    `quantity` and `service`.  The files are saved to the uploads
    directory using secure filenames.  A basic order ID is generated
    and returned in the response.  In a production system you would
    validate input, store order details in a database and integrate
    with a payment provider.
    """
    files = request.files.getlist('files')
    quantity = request.form.get('quantity')
    service = request.form.get('service', '')
    order_id = uuid.uuid4().hex

    # If files were provided, save them to the upload folder
    saved_filenames = []
    for uploaded in files:
        if uploaded and uploaded.filename:
            filename = secure_filename(uploaded.filename)
            save_path = os.path.join(UPLOAD_FOLDER, f"{order_id}_{filename}")
            uploaded.save(save_path)
            saved_filenames.append(filename)
    # Log the order details.  In a real app, store this in a DB.
    app.logger.info(
        "New order %s: service=%s, quantity=%s, files=%s",
        order_id, service, quantity, saved_filenames
    )

    # Forward the order to the Telegram bot microservice for manager notification.
    # Build a metadata dict to describe the order. Add additional fields as needed.
    meta = {
        "order_id": order_id,
        "service": service,
        "quantity": quantity,
    }
    # Prepare files for multipart upload to the microservice. We reopen the saved
    # files from disk to ensure the content is readable. Each tuple contains
    # (field_name, (filename, file_object)).
    files_for_telegram: list[tuple[str, tuple[str, object]]] = []
    for filename in saved_filenames:
        saved_path = os.path.join(UPLOAD_FOLDER, f"{order_id}_{filename}")
        try:
            file_handle = open(saved_path, "rb")
            files_for_telegram.append(('files', (filename, file_handle)))
        except Exception as e:
            app.logger.error("Failed to open file %s for Telegram upload: %s", saved_path, e)
    # Compose form data. The 'meta' field must be a JSON string as expected by the bot.
    data = {'meta': json.dumps(meta)}
    headers = {}
    if BOT_SECRET:
        headers['X-BOT-SECRET'] = BOT_SECRET
    try:
        resp = requests.post(
            TELEGRAM_SERVICE_URL,
            headers=headers,
            data=data,
            files=files_for_telegram,
            timeout=10,
        )
        resp.raise_for_status()
        app.logger.info("Order %s forwarded to Telegram bot", order_id)
    except Exception as e:
        app.logger.error("Failed to forward order %s to Telegram bot: %s", order_id, e)
    finally:
        # Close all file handles to avoid resource leaks
        for _, (_, fh) in files_for_telegram:
            try:
                fh.close()
            except Exception:
                pass

    return jsonify({"status": "success", "orderId": order_id})


if __name__ == "__main__":
    # For development use only. In production, use a WSGI server.
    app.run(host="0.0.0.0", port=5000, debug=True)