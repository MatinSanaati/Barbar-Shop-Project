// این فایل برای پاک کردن همه کاربران از دیتابیس است
// اجرا: node scripts/reset-db.js
// ⚠️ قبل از اجرا، سرور نود رو خاموش کن


const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// مسیر فایل دیتابیس
const dbPath = path.resolve(__dirname, 'config', 'database.db');
const db = new sqlite3.Database(dbPath);

// باز کردن دیتابیس و پاک کردن کاربران
db.serialize(() => {
    // پاک کردن همه کاربران
    db.run('DELETE FROM users', (err) => {
        if (err) {
            console.error('❌ خطای پاک کردن کاربران:', err.message);
        } else {
            console.log('✅ همه کاربران با موفقیت پاک شدند');
        }
    });

    // ریست کردن شمارنده ID (اگر از AUTOINCREMENT استفاده می‌کنه)
    db.run("DELETE FROM sqlite_sequence WHERE name='users'", (err) => {
        if (err) {
            console.warn('⚠️ نمی‌تونه sqlite_sequence رو پاک کنه (مشکلی نداره)');
        } else {
            console.log('🔁 شمارنده کاربران ریست شد');
        }
    });
});

// بستن دیتابیس
db.close((err) => {
    if (err) {
        console.error('❌ خطای بستن دیتابیس:', err.message);
    } else {
        console.log('🔌 دیتابیس بسته شد');
    }
});