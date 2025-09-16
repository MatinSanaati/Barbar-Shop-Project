const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 🔹 مسیر دیتابیس
const dbPath = path.join(__dirname, '/database.db');
console.log('📁 مسیر دیتابیس:', dbPath);

// 🔹 اتصال به دیتابیس
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ خطا در اتصال به دیتابیس:', err.message);
  } else {
    console.log('✅ اتصال به دیتابیس موفقیت‌آمیز بود');
  }
});

// 🔹 فعال‌کردن لاگ برای دیباگ
db.on('trace', (sql) => console.log('🔍 SQL:', sql));
db.on('error', (err) => console.error('🚨 خطای دیتابیس:', err));

// 🔹 ساخت یا به‌روزرسانی جداول
db.serialize(() => {
  // --- 1. جدول کاربران ---
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      otp TEXT,
      otp_expires_at DATETIME,
      created_at TEXT DEFAULT (datetime('now')),
      last_login TEXT DEFAULT (datetime('now'))
    )
  `, (err) => {
    if (err) console.error('❌ خطا در ساخت جدول users:', err.message);
    else console.log('✅ جدول users آماده است');
  });

  db.run("ALTER TABLE users ADD COLUMN created_at TEXT DEFAULT (datetime('now'))", (err) => {
    if (err) console.log('ℹ️ ستون created_at قبلاً اضافه شده یا خطا دارد');
    else console.log('✅ ستون created_at به جدول users اضافه شد');
  });

  db.run("ALTER TABLE users ADD COLUMN last_login TEXT DEFAULT (datetime('now'))", (err) => {
    if (err) console.log('ℹ️ ستون last_login قبلاً اضافه شده یا خطا دارد');
    else console.log('✅ ستون last_login به جدول users اضافه شد');
  });

  // --- 2. جدول نوبت‌ها ---
  db.run(`
    CREATE TABLE IF NOT EXISTS turns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      barber_id INTEGER,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error('❌ خطا در ساخت جدول turns:', err.message);
    else console.log('✅ جدول turns آماده است');
  });

  db.run("ALTER TABLE turns ADD COLUMN service TEXT NOT NULL DEFAULT 'general'", (err) => {
    if (err) console.log('ℹ️ ستون service قبلاً اضافه شده یا در حال حاضر موجود است');
    else console.log('✅ ستون service به جدول turns اضافه شد');
  });

  db.run("ALTER TABLE turns ADD COLUMN created_at TEXT", (err) => {
    if (err) console.log('ℹ️ ستون created_at قبلاً اضافه شده یا خطا دارد');
    else {
      console.log('✅ ستون created_at به جدول turns اضافه شد');
      db.run("UPDATE turns SET created_at = datetime('now') WHERE created_at IS NULL");
    }
  });

  db.run("ALTER TABLE turns ADD COLUMN updated_at TEXT", (err) => {
    if (err) console.log('ℹ️ ستون updated_at قبلاً اضافه شده یا خطا دارد');
    else {
      console.log('✅ ستون updated_at به جدول turns اضافه شد');
      db.run("UPDATE turns SET updated_at = datetime('now') WHERE updated_at IS NULL");
    }
  });

  // --- 3. جدول پروفایل کاربران ---
  db.run(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      phone TEXT,
      address TEXT,
      avatar TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error('❌ خطا در ساخت جدول profiles:', err.message);
    else console.log('✅ جدول profiles آماده است');
  });

  // --- 4. جدول تنظیمات کاربر ---
  db.run(`
    CREATE TABLE IF NOT EXISTS user_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      notifications_enabled BOOLEAN DEFAULT 1,
      theme TEXT DEFAULT 'dark',
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error('❌ خطا در ساخت جدول user_settings:', err.message);
    else console.log('✅ جدول user_settings آماده است');
  });

  // --- 5. جدول خدمات آرایشگاه ---
  db.run(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      duration INTEGER NOT NULL,
      image TEXT,
      category TEXT DEFAULT 'haircut'
    )
  `, (err) => {
    if (err) console.error('❌ خطا در ساخت جدول services:', err.message);
    else console.log('✅ جدول services آماده است');
  });

  // --- 6. جدول گالری نمونه کارها ---
  db.run(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      image TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT
    )
  `, (err) => {
    if (err) console.error('❌ خطا در ساخت جدول gallery:', err.message);
    else console.log('✅ جدول gallery آماده است');
  });

});

module.exports = db;