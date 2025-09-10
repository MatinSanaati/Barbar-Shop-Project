const db = require('../config/db');

class User {
    // ثبت‌نام کاربر جدید
    static async register(userData) {
        const { name, phone } = userData;

        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO users (name, phone) VALUES (?, ?)',
                [name, phone],
                function (err) {
                    if (err) {
                        console.error('خطای دیتابیس:', err);
                        if (err.message.includes('UNIQUE')) {
                            return reject(new Error('شماره تلفن قبلاً ثبت شده'));
                        }
                        return reject(new Error(`خطا در ثبت‌نام: ${err.message}`));
                    }
                    resolve({ id: this.lastID, name, phone, role: 'user' });
                }
            );
        });
    }

    // ورود کاربر — چک کردن شماره تلفن
    static async login(phone) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE phone = ?',
                [phone],
                (err, user) => {
                    if (err) return reject(err);
                    if (!user) return reject(new Error('کاربری با این شماره یافت نشد'));
                    resolve(user);
                }
            );
        });
    }

    // ✅ متد جدید: گرفتن کاربر با ID
    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE id = ?',
                [id],
                (err, user) => {
                    if (err) return reject(err);
                    if (!user) return reject(new Error('کاربر یافت نشد'));
                    resolve(user);
                }
            );
        });
    }
}

module.exports = User;