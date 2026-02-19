

from __future__ import annotations

import os
from dotenv import load_dotenv, find_dotenv

# Load environment variables from a .env file if present. Use find_dotenv() to locate
# a .env file in parent directories as well.
load_dotenv(find_dotenv())

BOT_TOKEN: str | None = os.getenv("BOT_TOKEN")
"""Telegram bot token obtained from BotFather. Must be set for the bot to
connect to the Telegram API."""

# Chat ID can be an integer (for private chats) or a string like "@channelname"
_manager_chat_id = os.getenv("MANAGER_CHAT_ID")
MANAGER_CHAT_ID: int | str | None
if _manager_chat_id is not None:
    try:
        # Try to convert to int; fallback to string for channels or groups
        MANAGER_CHAT_ID = int(_manager_chat_id)
    except ValueError:
        MANAGER_CHAT_ID = _manager_chat_id
else:
    MANAGER_CHAT_ID = None

# Secret header to authenticate backend requests
BOT_SECRET: str | None = os.getenv("BOT_SECRET")

# Optional endpoint on your backend to receive status updates from the bot
SERVER_STATUS_ENDPOINT: str | None = os.getenv("SERVER_STATUS_ENDPOINT")


def validate_config() -> None:
    """Raises a RuntimeError if mandatory configuration values are missing.

    Ensure that BOT_TOKEN, MANAGER_CHAT_ID and BOT_SECRET are provided via
    environment variables or a `.env` file. This function should be called
    at application startup to fail fast if configuration is incomplete.
    """
    missing: list[str] = []
    if not BOT_TOKEN:
        missing.append("BOT_TOKEN")
    if MANAGER_CHAT_ID is None:
        missing.append("MANAGER_CHAT_ID")
    if not BOT_SECRET:
        missing.append("BOT_SECRET")
    if missing:
        raise RuntimeError(
            f"Missing required configuration values: {', '.join(missing)}.\n"
            "Create a `.env` file or set these variables in your environment."
        )