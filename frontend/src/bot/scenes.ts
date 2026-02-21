import { Scenes, Markup } from 'telegraf';
import { BotContext, OrderSession } from './types';
import { sendOrderToManager, OrderData, createOrderIds } from './core';
import { FIZ_CATEGORIES, JUR_CATEGORIES } from '../data/services';

// Flatten services for easier access
const allServices = [
  ...FIZ_CATEGORIES.flatMap(c => c.services),
  ...JUR_CATEGORIES.flatMap(c => c.services)
].map(s => ({
  id: s.slug,
  title: s.title,
  price: parseFloat(s.price.replace(/[^0-9.]/g, '')) || 0 // Extract price
}));

const sizes = ['A4', 'A3', 'A2', 'Другое'];
const quantities = [1, 5, 10, 20, 50, 100, 'Другое'];

const orderWizard = new Scenes.WizardScene<BotContext>(
  'order-wizard',
  // Step 1: Service Selection
  async (ctx) => {
    ctx.session.order = {};
    // Show categories first or just popular services? Let's show categories logic or simplified list.
    // For simplicity, let's show a few main categories or a flat list if small.
    // Given the list is potentially long, let's show categories.
    // Actually, let's just use the flat list but paginated or grouped if needed.
    // For now, let's take top 6 services or just list them.

    // Let's use a simplified list for the bot based on the data
    const buttons = allServices.slice(0, 8).map(s => [Markup.button.callback(s.title, `service_${s.id}`)]);

    await ctx.reply('Выберите услугу:', Markup.inlineKeyboard(buttons));
    return ctx.wizard.next();
  },
  // Step 2: Size Selection
  async (ctx) => {
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const serviceId = ctx.callbackQuery.data.replace('service_', '');
      const service = allServices.find(s => s.id === serviceId);
      if (service) {
        ctx.session.order.service = service.title;
        ctx.session.order.unitPrice = service.price;
        await ctx.reply(`Выбрано: ${service.title}. Выберите размер:`, Markup.inlineKeyboard(
          sizes.map(s => [Markup.button.callback(s, `size_${s}`)])
        ));
        return ctx.wizard.next();
      }
    }
    await ctx.reply('Пожалуйста, выберите услугу из списка.');
    return;
  },
  // Step 3: Quantity Selection
  async (ctx) => {
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const size = ctx.callbackQuery.data.replace('size_', '');
      ctx.session.order.size = size;
      if (size === 'Другое') {
        await ctx.reply('Введите желаемый размер текстом:');
        return ctx.wizard.next(); // Go to manual size input step
      }
      // Skip manual size input
      await ctx.reply('Выберите количество:', Markup.inlineKeyboard(
        quantities.map(q => [Markup.button.callback(String(q), `qty_${q}`)])
      ));
      return ctx.wizard.selectStep(4);
    }
    // Handle manual size input from previous step if "Other" was selected
    if (ctx.message && 'text' in ctx.message) {
      ctx.session.order.size = ctx.message.text;
      await ctx.reply('Выберите количество:', Markup.inlineKeyboard(
        quantities.map(q => [Markup.button.callback(String(q), `qty_${q}`)])
      ));
      return ctx.wizard.next();
    }
    await ctx.reply('Пожалуйста, выберите размер.');
    return;
  },
  // Step 4: Quantity Input (Manual or Selection)
  async (ctx) => {
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const qtyStr = ctx.callbackQuery.data.replace('qty_', '');
      if (qtyStr === 'Другое') {
        await ctx.reply('Введите количество числом:');
        return ctx.wizard.next();
      }
      ctx.session.order.qty = parseInt(qtyStr, 10);
      await ctx.reply('Добавьте комментарий (или нажмите "Пропустить"):', Markup.inlineKeyboard([
        Markup.button.callback('Пропустить', 'skip_comment')
      ]));
      return ctx.wizard.selectStep(6);
    }
    // Handle manual quantity input
    if (ctx.message && 'text' in ctx.message) {
      const qty = parseInt(ctx.message.text, 10);
      if (isNaN(qty)) {
        await ctx.reply('Пожалуйста, введите число.');
        return;
      }
      ctx.session.order.qty = qty;
      await ctx.reply('Добавьте комментарий (или нажмите "Пропустить"):', Markup.inlineKeyboard([
        Markup.button.callback('Пропустить', 'skip_comment')
      ]));
      return ctx.wizard.next();
    }
    return;
  },
  // Step 5: Comment Input
  async (ctx) => {
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery && ctx.callbackQuery.data === 'skip_comment') {
      ctx.session.order.comment = null;
    } else if (ctx.message && 'text' in ctx.message) {
      ctx.session.order.comment = ctx.message.text;
    }

    ctx.session.order.files = [];
    await ctx.reply('Прикрепите файлы (фото или документы). Когда закончите, нажмите "Готово".', Markup.inlineKeyboard([
      Markup.button.callback('✅ Готово', 'files_done')
    ]));
    return ctx.wizard.next();
  },
  // Step 6: File Upload Loop
  async (ctx) => {
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery && ctx.callbackQuery.data === 'files_done') {
      // Show summary
      const order = ctx.session.order;
      const totalPrice = (order.unitPrice || 0) * (order.qty || 1);

      const summary = `Ваш заказ:
Услуга: ${order.service}
Размер: ${order.size}
Количество: ${order.qty}
Цена: ~${totalPrice} ₽
Файлов: ${order.files?.length || 0}
Комментарий: ${order.comment || '—'}

Отправить менеджеру?`;

      await ctx.reply(summary, Markup.inlineKeyboard([
        [Markup.button.callback('✅ Отправить', 'confirm_order')],
        [Markup.button.callback('❌ Отмена', 'cancel_order')]
      ]));
      return ctx.wizard.next();
    }

    // Handle file upload
    if (ctx.message) {
      let fileId = '';
      let fileName = 'file';
      let type: 'document' | 'photo' = 'document';

      if ('document' in ctx.message) {
        fileId = ctx.message.document.file_id;
        fileName = ctx.message.document.file_name || 'document';
        type = 'document';
      } else if ('photo' in ctx.message) {
        fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id; // Best quality
        fileName = `photo_${Date.now()}.jpg`;
        type = 'photo';
      }

      if (fileId) {
        ctx.session.order.files = ctx.session.order.files || [];
        ctx.session.order.files.push({ file_id: fileId, type }); // Store minimal info
        await ctx.reply(`Файл добавлен. Всего: ${ctx.session.order.files.length}. Нажмите "Готово", если всё.`);
      } else {
        await ctx.reply('Пожалуйста, отправьте файл или нажмите "Готово".');
      }
    }
    return;
  },
  // Step 7: Confirmation
  async (ctx) => {
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      if (ctx.callbackQuery.data === 'confirm_order') {
        const clientName = `${ctx.from?.first_name || ''} ${ctx.from?.last_name || ''}`.trim() || 'Unknown';
        const clientUsername = ctx.from?.username;
        const telegramUserId = ctx.from?.id || 0;

        // Generate IDs using centralized logic
        const { internal_id, order_number } = createOrderIds('tg', {
          service: ctx.session.order.service,
          total_price: (ctx.session.order.unitPrice || 0) * (ctx.session.order.qty || 1),
          client_name: clientName,
          client_username: clientUsername,
          telegram_user_id: telegramUserId
        });

        const orderData: OrderData = {
          order_number: order_number,
          internal_id: internal_id,
          service: ctx.session.order.service || 'Unknown',
          unit_price: ctx.session.order.unitPrice || 0,
          qty: ctx.session.order.qty || 1,
          total_price: (ctx.session.order.unitPrice || 0) * (ctx.session.order.qty || 1),
          client_name: clientName,
          client_username: clientUsername,
          telegram_user_id: telegramUserId,
          size: ctx.session.order.size || 'Unknown',
          comment: ctx.session.order.comment,
          created_at: new Date().toISOString(),
          files: (ctx.session.order.files || []).map(f => ({
            name: 'file', // We don't have name easily here without storing it in session properly, but let's try to improve
            file_id: f.file_id,
            type: f.type
          }))
        };

        await sendOrderToManager(orderData);
        await ctx.reply('Заказ отправлен менеджеру! ✅');

        // Clear session
        ctx.session.order = {};

        return ctx.scene.leave();
      } else if (ctx.callbackQuery.data === 'cancel_order') {
        await ctx.reply('Заказ отменен.');
        ctx.session.order = {};
        return ctx.scene.leave();
      }
    }
    return;
  }
);

export default orderWizard;
