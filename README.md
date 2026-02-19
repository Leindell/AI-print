# AI.Print Studio Website Skeleton

This repository contains a starting point for the AI.Print Studio website.  It
uses **React** for the front end and **Flask** for a simple back end API.  The
design follows a minimalist black‑and‑white theme and is structured around
information publicly available in business listings, such as the address,
opening hours and offered categories【339219316284430†L38-L115】.

## Project Structure

```
ai_print_studio/
├── frontend/               # React application
│   ├── public/             # Static assets (not included here)
│   └── src/
│       ├── components/     # Reusable UI components like NavBar and Footer
│       ├── pages/          # Top-level pages (Home, Services, About, Contact)
│       ├── App.js          # Routes and layout
│       ├── index.js        # Entry point for React
│       └── styles.css      # Global stylesheet
├── backend/                # Flask API server
│   ├── app.py             # Defines service and contact endpoints
│   └── requirements.txt   # Python dependencies
├── telegram_bot/         # FastAPI + aiogram microservice for Telegram notifications
│   ├── main.py           # FastAPI application and aiogram bot
│   ├── config.py         # Loads environment variables for the bot
│   ├── requirements.txt  # Bot‑specific Python dependencies
│   └── __init__.py       # Package marker
└── .env.example         # Example environment configuration
```

## Running the Project

1. **Backend**
   - Navigate to the `backend` directory:
     ```bash
     cd ai_print_studio/backend
     ```
   - Create and activate a virtual environment (optional but recommended):
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the Flask server:
     ```bash
     flask run
     ```
   - The API will be available at `http://localhost:5000`.

2. **Frontend**
   - In a separate terminal, navigate to the `frontend` directory and install
     dependencies (requires Node.js and npm):
     ```bash
     cd ai_print_studio/frontend
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```
   - The React app will open at `http://localhost:3000` and proxy API
     requests to the Flask back end via the proxy settings in `package.json`.

3. **Telegram Bot**
   - Navigate to the `telegram_bot` directory:
     ```bash
     cd ai_print_studio/telegram_bot
     ```
   - Create and activate a virtual environment (optional but recommended):
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the FastAPI service using Uvicorn. Before running the service make sure you have created a `.env` file at the root of the `ai_print_studio` package (see the *Environment Variables* section below) with your Telegram bot token, manager chat ID and secret.  Run this command from the root of the repository (the directory containing the `ai_print_studio` package) so that the module imports resolve correctly:
     ```bash
     # from the repository root
     uvicorn ai_print_studio.telegram_bot.main:app --reload
     ```
   - The bot service will listen on `http://localhost:8000/api/bot/orders`. When your backend receives a new order, it forwards it to this endpoint, and the bot notifies the manager via Telegram with inline buttons to accept, clarify or reject the order.

### Environment Variables

Both the Flask backend and the Telegram bot microservice use environment variables for configuration.  Create a `.env` file at the root of the `ai_print_studio` package (see `.env.example`) with the following variables:

```
BOT_TOKEN=your-telegram-bot-token
MANAGER_CHAT_ID=123456789
BOT_SECRET=supersecret
TELEGRAM_SERVICE_URL=http://localhost:8000/api/bot/orders
# Optional: Endpoint on your backend to receive status updates from the bot
SERVER_STATUS_ENDPOINT=http://localhost:5000/api/orders/{id}/status
```

`BOT_TOKEN` and `MANAGER_CHAT_ID` are required for the bot to work.  `BOT_SECRET` must be the same secret used by the backend to authenticate requests to the bot.  `TELEGRAM_SERVICE_URL` tells the backend where to forward orders (defaults to the local FastAPI service).  `SERVER_STATUS_ENDPOINT` is optional; if set, the bot will POST status updates back to your backend when a manager interacts with the Telegram message.

## Customisation

- **Services:** Update the service list in `backend/app.py` or implement
  database integration as needed.
- **Styling:** All global styles live in `frontend/src/styles.css`.  The
  palette is intentionally monochrome but can be extended with accent
  colours.
- **Deployment:** For production use, build the React app (`npm run build`)
  and serve the static files from the Flask server or a separate web
  server.  Consider using a production‑ready WSGI server such as Gunicorn.

## Source References

The company information (address, hours, categories and payment methods) comes
from the public listing on the Flamp/2GIS directory【339219316284430†L38-L115】.  A search
snippet describing fast polaroid photo printing inspired the tagline and
highlighted features on the home page【958412501063179†L1-L3】.