const { Telegraf, Markup } = require('telegraf');

const BOT_TOKEN = '8871196144:AAFMy926uMZVSVqy2SZmXrE0L4ib2s7kY24';
const ADMIN_CHAT_ID = '1184007742';

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply("🌟 7STAR Brand Atelier botiga xush kelibsiz!");
});

bot.on('photo', async (ctx) => {
    const userId = ctx.from.id;
    const photo = ctx.message.photo[ctx.message.photo.length - 1].file_id;

    await bot.telegram.sendPhoto(ADMIN_CHAT_ID, photo, {
        caption: `🔔 YANGI TO'LOV CHEKI!\n\nMijoz ID: ${userId}`,
        ...Markup.inlineKeyboard([
            [Markup.button.callback(`✅ Tasdiqlash`, `approve_${userId}`)],
            [Markup.button.callback(`❌ Rad etish`, `reject_${userId}`)]
        ])
    });

    ctx.reply("✅ Chekingiz qabul qilindi! Operator tekshirmoqda.");
});

bot.action(/^approve_(.+)$/, async (ctx) => {
    const customerId = ctx.match[1];
    await bot.telegram.sendMessage(customerId, "🎉 Tabriklaymiz! To'lovingiz tasdiqlandi.");
    ctx.editMessageCaption("✅ To'lov tasdiqlandi.");
});

bot.action(/^reject_(.+)$/, async (ctx) => {
    const customerId = ctx.match[1];
    await bot.telegram.sendMessage(customerId, "❌ Kechirasiz, to'lovingiz tasdiqlanmadi.");
    ctx.editMessageCaption("❌ To'lov rad etildi.");
});

bot.launch();
console.log("🚀 7STAR Telegram Bot muvaffaqiyatli ishga tushdi!");
