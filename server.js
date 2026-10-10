const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const BOT_TOKEN = '8871196144:AAFMy926uMZVSVqy2SZmXrE0L4ib2s7kY24';
const ADMIN_CHAT_ID = '1184007742';

const bot = new Telegraf(BOT_TOKEN);

// 1. Render port talabini qondirish uchun HTTP serverni birinchi bo'lib yoqamiz
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('7STAR Bot is running 24/7!\n');
}).listen(PORT, '0.0.0.0', () => {
    console.log(`HTTP server running on port ${PORT}`);
});

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

// 2. Port ochilgandan keyin 2 soniya kutib, botni xavfsiz ishga tushiramiz
setTimeout(() => {
    bot.launch().then(() => {
        console.log("🚀 7STAR Telegram Bot muvaffaqiyatli ishga tushdi!");
    }).catch(err => {
        console.error("Botni ishga tushirishda xatolik:", err);
    });
}, 2000);
