import { Scenes, session } from "telegraf";
import { BotContext } from "./types";
import orderWizard from "./scenes";
import { bot } from "./core";

// --- Stage (scenes) ---
const stage = new Scenes.Stage<BotContext>([orderWizard]);

// --- Logger FIRST ---
bot.use(async (ctx, next) => {
  const msg: any = (ctx as any).message;
  console.log("TG UPDATE:", ctx.updateType, "from", ctx.from?.id, "text:", msg?.text);
  return next();
});

// --- Stable in-memory session (вместо sqliteSession) ---
bot.use(session());

// --- Scenes middleware ---
bot.use(stage.middleware());

bot.catch((err) => console.error("TG ERROR:", err));

// --- Main menu ---
const MAIN_MENU = {
  reply_markup: {
    keyboard: [
      [{ text: "🛒 Оформить заказ" }],
      [{ text: "📋 Прайс / Услуги" }, { text: "📦 Мои заказы" }],
      [{ text: "🏢 О компании" }, { text: "✍️ Написать менеджеру" }],
    ],
    resize_keyboard: true,
  },
} as const;

// --- Commands / Handlers ---
bot.start(async (ctx) => {
  await ctx.reply("Добро пожаловать в AI.Print Studio! 🤖\n\nВыберите действие:", MAIN_MENU);
});

bot.hears("🛒 Оформить заказ", async (ctx) => {
  await ctx.scene.enter("order-wizard");
});

bot.hears("📋 Прайс / Услуги", async (ctx) => {
  await ctx.reply(
    "📋 Прайс / Услуги:\n\n• Фотопечать\n• Документы\n• Сувениры\n• Полиграфия\n\nЕсли нужно — напишите менеджеру, он подскажет цену и сроки.",
    MAIN_MENU
  );
});

bot.hears("📦 Мои заказы", async (ctx) => {
  // Если у тебя есть реальная логика заказов — подключим позже.
  // Сейчас заглушка, чтобы кнопка работала.
  await ctx.reply("📦 Пока история заказов в разработке. Напишите менеджеру — проверим вручную.", MAIN_MENU);
});

bot.hears("🏢 О компании", async (ctx) => {
  await ctx.reply(
    "🏢 AI.Print Studio\n\nПечать и дизайн: фото, документы, сувениры и полиграфия.\nРаботаем аккуратно и быстро. Можно прислать файлы и ТЗ в чат менеджеру.",
    MAIN_MENU
  );
});

bot.hears("✍️ Написать менеджеру", async (ctx) => {
  const managerUsername = process.env.MANAGER_USERNAME; // например: @ai_print_manager
  const managerChatId = process.env.MANAGER_CHAT_ID; // можно оставить как есть, если используется в handleOrder

  if (managerUsername) {
    await ctx.reply(`Напишите менеджеру: ${managerUsername}`, MAIN_MENU);
    return;
  }

  // fallback
  await ctx.reply(
    `Менеджер: ${managerChatId ? "ID задан в .env" : "не настроен"}.\nДобавь MANAGER_USERNAME=@username в .env для удобной ссылки.`,
    MAIN_MENU
  );
});

let started = false;

// --- Start Bot ---
export async function startBot() {
  if (started) {
    console.log("BOT: already started, skipping");
    return;
  }
  started = true;

  console.log("startBot() CALLED", {
    BOT_TOKEN: !!process.env.BOT_TOKEN,
    BOT_TOKEN_LEN: (process.env.BOT_TOKEN || "").length,
  });

  if (!process.env.BOT_TOKEN) {
    console.warn("BOT_TOKEN not provided. Bot not started.");
    return;
  }

  // Проверка токена/доступа
  const me = await bot.telegram.getMe();
  console.log("BOT: getMe OK:", { id: me.id, username: me.username });

  await bot.telegram.deleteWebhook({ drop_pending_updates: true });
  console.log("Webhook deleted (polling mode).");

  bot.launch().catch((e) => console.error("BOT LAUNCH ERROR:", e));
  console.log("BOT: launch() called (server continues)");

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

export { handleOrder } from "./core";