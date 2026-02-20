import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'orders.db');

const db = new Database(DB_PATH);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS processed_orders (
    order_number INTEGER,
    internal_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_number, internal_id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number INTEGER,
    source TEXT, -- 'tg' or 'http'
    service TEXT,
    total_price REAL,
    client_name TEXT,
    client_username TEXT,
    telegram_user_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    key TEXT PRIMARY KEY,
    session TEXT
  );
`);

export default db;
