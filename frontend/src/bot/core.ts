import { Telegraf } from 'telegraf';
import { format } from 'date-fns';
import db from './db';
import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';

// Types
export interface OrderFile {
  name: string;
  url?: string; // For HTTP orders
  file_id?: string; // For Telegram orders
  type?: 'document' | 'photo';
}

export interface OrderData {
  order_number: number;
  internal_id: number;
  service: string;
  unit_price: number;
  qty: number;
  total_price: number;
  client_name: string;
  client_username?: string;
  telegram_user_id: number;
  size: string;
  comment?: string | null;
  created_at: string;
  files: OrderFile[];
}

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const MANAGER_CHAT_ID = process.env.MANAGER_CHAT_ID || '';
const MAX_FILE_MB = parseInt(process.env.MAX_FILE_MB || '20', 10);

export const bot = new Telegraf(BOT_TOKEN);

// Deduplication
function isDuplicate(orderNumber: number, internalId: number): boolean {
  const stmt = db.prepare('SELECT 1 FROM processed_orders WHERE order_number = ? AND internal_id = ?');
  const result = stmt.get(orderNumber, internalId);
  return !!result;
}

function markProcessed(orderNumber: number, internalId: number) {
  const stmt = db.prepare('INSERT INTO processed_orders (order_number, internal_id) VALUES (?, ?)');
  try {
    stmt.run(orderNumber, internalId);
  } catch (e) {
    // Ignore unique constraint violation
  }
}

// Cleanup old records
function cleanupOldRecords() {
  const stmt = db.prepare("DELETE FROM processed_orders WHERE created_at < datetime('now', '-1 day')");
  stmt.run();
}
setInterval(cleanupOldRecords, 3600000); // Run every hour

// Formatting
function formatOrderMessage(order: OrderData): string {
  const date = new Date(order.created_at);
  const formattedDate = format(date, 'dd.MM.yyyy HH:mm');
  const comment = order.comment || '—';
  const clientUsername = order.client_username ? `(@${order.client_username})` : '';

  return `Новый заказ №${order.order_number}
(ID: ${order.internal_id})

Услуга: ${order.service}
Цена за единицу: ${order.unit_price} ₽
Количество: ${order.qty}
Файлы: ${order.files.length} шт.
Общая цена: ${order.total_price} ₽
Клиент: ${order.client_name} ${clientUsername}
ID пользователя: ${order.telegram_user_id}
Размер: ${order.size}
Комментарий: ${comment}
Дата: ${formattedDate}`;
}

// File Handling
async function downloadFile(url: string, filename: string): Promise<string | null> {
  try {
    const tempDir = path.join(process.cwd(), 'temp_uploads');
    await fs.ensureDir(tempDir);
    const filePath = path.join(tempDir, filename);

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 30000, // 30s timeout
      maxContentLength: MAX_FILE_MB * 1024 * 1024,
    });

    // Check content length if available
    const contentLength = response.headers['content-length'];
    if (contentLength && parseInt(contentLength, 10) > MAX_FILE_MB * 1024 * 1024) {
      console.warn(`File ${filename} too large: ${contentLength} bytes`);
      return null;
    }

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filePath));
      writer.on('error', (err) => {
        fs.unlink(filePath).catch(() => {}); // Cleanup on error
        reject(err);
      });
    });
  } catch (error) {
    console.error(`Failed to download file ${url}:`, error);
    return null;
  }
}

// Core Function: Send Order to Manager
export async function sendOrderToManager(order: OrderData) {
  if (!BOT_TOKEN || !MANAGER_CHAT_ID) {
    console.warn('Bot token or Manager Chat ID missing');
    return;
  }

  if (isDuplicate(order.order_number, order.internal_id)) {
    console.log(`Order ${order.order_number} (ID: ${order.internal_id}) already processed. Skipping.`);
    return;
  }

  const message = formatOrderMessage(order);

  try {
    // 1. Send Text
    await bot.telegram.sendMessage(MANAGER_CHAT_ID, message);

    // 2. Send Files
    if (order.files.length > 0) {
      const mediaGroup: any[] = [];
      const tempFiles: string[] = [];

      for (const file of order.files) {
        if (file.url) {
          // HTTP Order: Download file
          const localPath = await downloadFile(file.url, file.name);
          if (localPath) {
            tempFiles.push(localPath);
            mediaGroup.push({
              type: 'document',
              media: { source: localPath, filename: file.name },
              caption: file.name
            });
          } else {
            await bot.telegram.sendMessage(MANAGER_CHAT_ID, `Файл ${file.name} не удалось загрузить.`);
          }
        } else if (file.file_id) {
          // Telegram Order: Use file_id directly
          mediaGroup.push({
            type: file.type || 'document',
            media: file.file_id,
            caption: file.name
          });
        }
      }

      // Send Media Group (split by 10)
      if (mediaGroup.length > 0) {
        const chunkSize = 10;
        for (let i = 0; i < mediaGroup.length; i += chunkSize) {
          const chunk = mediaGroup.slice(i, i + chunkSize);
          try {
            if (chunk.length === 1) {
               // Single file
               if (chunk[0].type === 'photo') {
                 await bot.telegram.sendPhoto(MANAGER_CHAT_ID, chunk[0].media, { caption: chunk[0].caption });
               } else {
                 await bot.telegram.sendDocument(MANAGER_CHAT_ID, chunk[0].media, { caption: chunk[0].caption });
               }
            } else {
               // Group - only first item gets caption to avoid Telegram errors
               const mediaChunk = chunk.map((item: any, index: number) => ({
                 ...item,
                 caption: index === 0 ? item.caption : undefined
               }));
               await bot.telegram.sendMediaGroup(MANAGER_CHAT_ID, mediaChunk);
            }
          } catch (e) {
            console.error('Error sending media chunk:', e);
            await bot.telegram.sendMessage(MANAGER_CHAT_ID, 'Ошибка отправки части файлов.');
          }
        }
      }

      // Cleanup temp files
      for (const path of tempFiles) {
        fs.unlink(path).catch(() => {});
      }
    }

    markProcessed(order.order_number, order.internal_id);
    console.log(`Order ${order.order_number} processed successfully.`);

  } catch (error) {
    console.error('Error sending order to Telegram:', error);
  }
}

export const handleOrder = sendOrderToManager;

// ID Generation
export function createOrderIds(source: 'tg' | 'http', data: Partial<OrderData>): { internal_id: number, order_number: number } {
  const stmt = db.prepare(`
    INSERT INTO orders (source, service, total_price, client_name, client_username, telegram_user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    source,
    data.service || 'Unknown',
    data.total_price || 0,
    data.client_name || 'Unknown',
    data.client_username || null,
    data.telegram_user_id || 0
  );

  const internalId = info.lastInsertRowid as number;
  // Use internal ID as order number for simplicity and robustness, or add prefix logic
  const orderNumber = internalId; 

  // Update order_number in DB
  db.prepare('UPDATE orders SET order_number = ? WHERE id = ?').run(orderNumber, internalId);

  return { internal_id: internalId, order_number: orderNumber };
}
