# AI Print Studio

Fullstack application for a printing studio with Telegram integration.

## Stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Flask (Python)
- **Bot:** FastAPI, Aiogram (Python)

## Setup

### Prerequisites

- Node.js & npm
- Python 3.8+
- Telegram Bot Token (from @BotFather)
- Telegram Chat ID (where orders will be sent)

### Environment Variables

Create `.env` in the root directory:

```env
# Bot Configuration
BOT_TOKEN=your_bot_token_here
MANAGER_CHAT_ID=your_chat_id_here
BOT_SECRET=your_secret_key_here

# Backend Configuration
BOT_API_URL=http://localhost:8000/api/bot/orders
```

### Installation & Running

1.  **Frontend:**
    ```bash
    npm install
    npm run dev
    ```

2.  **Backend (Flask):**
    ```bash
    cd backend
    pip install -r requirements.txt
    python app.py
    ```

3.  **Bot (FastAPI):**
    ```bash
    cd bot
    pip install -r requirements.txt
    python main.py
    ```

## Features

- Service catalog for Individuals and Businesses.
- Order form with file upload.
- Orders are sent to a Telegram chat via a bot.
- Dark theme UI.
