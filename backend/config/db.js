// backend/config/db.js
const { Client } = require('pg');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL تنظیم نشده!');
  process.exit(1);
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // ضروری برای Neon
  }
});

client.connect()
  .then(() => console.log('✅ اتصال به PostgreSQL (Neon) برقرار شد'))
  .catch(err => {
    console.error('❌ خطا در اتصال به دیتابیس:', err.message);
    process.exit(1);
  });

module.exports = client;