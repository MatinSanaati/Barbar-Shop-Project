const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL تنظیم نشده!');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true, // ← تغییر کلیدی!
  rejectUnauthorized: false, // ← مهم برای Neon
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

// 🔥 اضافه کردن مدیریت خطا برای قطعی ناگهانی
pool.on('error', (err) => {
  console.error('⚠️ خطای ارتباط با دیتابیس:', err.message);
  // Pool به صورت خودکار سعی می‌کنه دوباره وصل بشه
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};