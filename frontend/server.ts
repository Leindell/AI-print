import "dotenv/config"; // чтобы process.env видел .env
import express from "express";
import { startBot, handleOrder } from "./src/bot/index";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import { OrderData, createOrderIds } from "./src/bot/core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Глобальные ловушки, чтобы ничего не умирало "тихо" */
process.on("unhandledRejection", (e) => console.error("UNHANDLED REJECTION:", e));
process.on("uncaughtException", (e) => console.error("UNCAUGHT EXCEPTION:", e));

console.log("ENV CHECK:", {
  BOT_TOKEN_SET: !!process.env.BOT_TOKEN,
  BOT_TOKEN_LEN: (process.env.BOT_TOKEN || "").length,
  MANAGER_CHAT_ID: process.env.MANAGER_CHAT_ID,
  SERVER_API_KEY_SET: !!process.env.SERVER_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
});

async function startServer() {
  console.log("A: startServer() begin");

  const app = express();
  const PORT = parseInt(process.env.SERVER_BIND_PORT || "8080", 10);
  const HOST = process.env.SERVER_BIND_HOST || "0.0.0.0";
  const API_KEY = process.env.SERVER_API_KEY;

  app.use(express.json());

  // uploads
  const UPLOADS_DIR = path.join(__dirname, "uploads");
  fs.ensureDirSync(UPLOADS_DIR);
  app.use("/uploads", express.static(UPLOADS_DIR));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });

  /** Запуск бота */
  console.log("B: before startBot()");
  await startBot();
  console.log("C: after startBot()");

  /** API: create order */
  app.post("/api/orders", async (req, res) => {
    const apiKey = req.header("X-Api-Key");
    if (!API_KEY || apiKey !== API_KEY) {
      return res.status(401).json({ success: false, error: "unauthorized" });
    }

    try {
      const body = req.body;

      if (!body.service || !body.total_price || !body.client_name) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }

      const { internal_id, order_number } = createOrderIds("http", {
        service: body.service,
        total_price: body.total_price,
        client_name: body.client_name,
        client_username: body.client_username,
        telegram_user_id: body.telegram_user_id,
      });

      const orderData: OrderData = {
        order_number,
        internal_id,
        service: body.service,
        unit_price: body.unit_price || 0,
        qty: body.qty || 1,
        total_price: body.total_price,
        client_name: body.client_name,
        client_username: body.client_username,
        telegram_user_id: body.telegram_user_id || 0,
        size: body.size || "Standard",
        comment: body.comment,
        created_at: body.created_at || new Date().toISOString(),
        files: body.files || [],
      };

      await handleOrder(orderData);

      res.json({ success: true, internal_id, order_number });
    } catch (error) {
      console.error("Error processing order:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  /** API: upload */
  app.post("/api/orders/upload", upload.array("files"), (req, res) => {
    const files = req.files as Express.Multer.File[];

    const base = process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`;

    const fileInfos = files.map((f) => ({
      name: f.originalname,
      url: `${base}/uploads/${f.filename}`,
    }));

    res.json({ success: true, files: fileInfos });
  });

  /** Vite dev middleware / static */
  console.log("D: before vite/static");
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("E: vite middleware attached");
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    console.log("E: static dist attached");
  }

  /** listen + error handler */
  console.log("F: before listen", { HOST, PORT });
  const server = app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });

  server.on("error", (e) => {
    console.error("LISTEN ERROR:", e);
  });

  console.log("G: server.ts is alive");

  // чтобы было видно, что процесс реально живёт
  setInterval(() => console.log("alive", new Date().toISOString()), 30000);
}

startServer().catch((e) => {
  console.error("FATAL startServer error:", e);
  process.exit(1);
});