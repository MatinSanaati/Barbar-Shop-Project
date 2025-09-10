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
    role TEXT NOT NULL DEFAULT 'user'
    )
  `, (err) => {
    if (err) {
      console.error('❌ خطا در ساخت جدول users:', err.message);
    } else {
      console.log('✅ جدول users ساخته شد یا قبلاً وجود داشت');
    }

    // ✅ چک کردن وجود ستون phone
    db.all("PRAGMA table_info(users)", (err, columns) => {
      if (err) {
        console.error('❌ خطا در چک کردن ستون‌های users:', err);
        return;
      }

      if (!columns || columns.length === 0) {
        console.log('⚠️ جدول users وجود ندارد یا خالی است');
        return;
      }

      const phoneColumn = columns.find(col => col.name === 'phone');
      if (!phoneColumn) {
        console.log('🔧 ستون phone وجود ندارد، در حال اضافه کردن...');
        // ❌ نه: ADD COLUMN phone TEXT UNIQUE NOT NULL
        // ✅ بله: فقط TEXT
        db.run("ALTER TABLE users ADD COLUMN phone TEXT", (err) => {
          if (err) {
            console.error('❌ خطا در اضافه کردن ستون phone:', err.message);
          } else {
            console.log('✅ ستون phone با موفقیت به جدول users اضافه شد (بدون NOT NULL/UNIQUE)');
          }
        });
      } else {
        console.log('🟢 ستون phone در جدول users وجود دارد');
      }
    });

    // ✅ چک کردن وجود جدول
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users';", (err, row) => {
      if (err) {
        console.error('❌ خطا در چک وجود جدول users:', err);
      } else if (row) {
        console.log('🟢 جدول users با موفقیت یافت شد');
      } else {
        console.log('🔴 جدول users وجود ندارد! مشکل جدی');
      }
    });
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
    if (err) {
      console.error('❌ خطا در ساخت جدول turns:', err.message);
    } else {
      console.log('✅ جدول turns ساخته شد یا قبلاً وجود داشت');
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
    if (err) {
      console.error('❌ خطا در ساخت جدول profiles:', err.message);
    } else {
      console.log('✅ جدول profiles ساخته شد یا قبلاً وجود داشت');
    }
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
    if (err) {
      console.error('❌ خطا در ساخت جدول user_settings:', err.message);
    } else {
      console.log('✅ جدول user_settings ساخته شد یا قبلاً وجود داشت');
    }
  });

  // --- 5. جدول خدمات آرایشگاه ---
  db.run(`
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    duration INTEGER NOT NULL, -- مدت زمان به دقیقه
    image TEXT, -- مسیر عکس یا URL
    category TEXT DEFAULT 'haircut'
  )
`, (err) => {
    if (err) {
      console.error('❌ خطا در ساخت جدول services:', err.message);
    } else {
      console.log('✅ جدول services ساخته شد یا قبلاً وجود داشت');
    }
  });

  // --- 6. جدول گالری نمونه کارها ---
  db.run(`
  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    image TEXT NOT NULL, -- مسیر عکس یا URL
    category TEXT NOT NULL, -- مثلاً: 'before-after', 'environment', 'beard', 'haircut'
    description TEXT
  )
`, (err) => {
    if (err) {
      console.error('❌ خطا در ساخت جدول gallery:', err.message);
    } else {
      console.log('✅ جدول gallery ساخته شد یا قبلاً وجود داشت');
    }
  });
});

module.exports = db;