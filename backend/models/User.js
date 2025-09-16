const db = require('../config/db');

class User {
    // ثبت‌نام کاربر جدید
    static async register(userData) {
        const { name, phone } = userData;

        const query = `
      INSERT INTO users (name, phone, role, created_at, last_login)
      VALUES ($1, $2, 'user', NOW(), NOW())
      RETURNING id, name, phone, role
    `;
        try {
            const result = await db.query(query, [name, phone]);
            return result.rows[0];
        } catch (err) {
            if (err.code === '23505') { // UNIQUE violation
                throw new Error('شماره تلفن قبلاً ثبت شده');
            }
            throw new Error(`خطا در ثبت‌نام: ${err.message}`);
        }
    }

    // ورود کاربر — چک کردن شماره تلفن
    static async login(phone) {
        const query = 'SELECT * FROM users WHERE phone = $1';
        const result = await db.query(query, [phone]);

        if (result.rows.length === 0) {
            throw new Error('کاربری با این شماره یافت نشد');
        }

        return result.rows[0];
    }

    // گرفتن کاربر با ID
    static async findById(id) {
        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            throw new Error('کاربر یافت نشد');
        }

        return result.rows[0];
    }

    // آپدیت کاربر
    static async update(id, updates) {
        const fields = [];
        const values = [];
        let index = 1;

        if (updates.name) {
            fields.push(`name = $${index++}`);
            values.push(updates.name);
        }
        if (updates.phone) {
            fields.push(`phone = $${index++}`);
            values.push(updates.phone);
        }

        if (fields.length === 0) {
            return this.findById(id);
        }

        values.push(id); // برای شرط WHERE
        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index}`;

        await db.query(query, values);
        return this.findById(id);
    }
}

module.exports = User;