// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const auth = require('../../middleware/auth');

// 🔹 ثبت نوبت جدید
router.post('/appointments', auth, (req, res) => {
    const { service, date, time } = req.body;
    const userId = req.user.id;

    if (!service || !date || !time) {
        return res.status(400).json({ error: 'تمام فیلدها الزامی هستند' });
    }

    // چک تداخل زمان
    db.get(
        'SELECT * FROM turns WHERE user_id = ? AND date = ? AND time = ?',
        [userId, date, time],
        (err, existing) => {
            if (err) return res.status(500).json({ error: 'خطا در بررسی نوبت' });
            if (existing) return res.status(409).json({ error: 'شما قبلاً نوبتی در این تاریخ و زمان دارید' });

            // ذخیره نوبت
            const stmt = db.prepare(`
                INSERT INTO turns (user_id, service, date, time, status)
                VALUES (?, ?, ?, ?, 'pending')
            `);
            stmt.run([userId, service, date, time], function (err) {
                if (err) return res.status(500).json({ error: 'خطا در ثبت نوبت' });
                res.status(201).json({
                    message: 'نوبت با موفقیت ثبت شد',
                    appointment: { id: this.lastID, service, date, time, status: 'pending' }
                });
            });
            stmt.finalize();
        }
    );
});

// 🔹 دریافت نوبت‌های کاربر
router.get('/appointments/me', auth, (req, res) => {
    const userId = req.user.id;

    db.all(
        `SELECT id, service, date, time, status FROM turns WHERE user_id = ? ORDER BY date DESC, time ASC`,
        [userId],
        (err, appointments) => {
            if (err) {
                return res.status(500).json({ error: 'خطا در دریافت نوبت‌ها' });
            }
            res.json({ appointments });
        }
    );
});

// 🔹 لغو نوبت توسط کاربر
router.delete('/appointments/:id', auth, (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    // چک کن آیا نوبت وجود داره و متعلق به کاربره
    db.get(
        'SELECT * FROM turns WHERE id = ? AND user_id = ?',
        [id, userId],
        (err, appointment) => {
            if (err) return res.status(500).json({ error: 'خطا در بررسی نوبت' });
            if (!appointment) return res.status(404).json({ error: 'نوبت یافت نشد یا دسترسی ندارید' });

            // فقط نوبت‌های pending قابل لغو هستن
            if (appointment.status !== 'pending') {
                return res.status(403).json({ error: 'این نوبت قابل لغو نیست' });
            }

            // لغو نوبت
            db.run('UPDATE turns SET status = "canceled" WHERE id = ?', [id], function (err) {
                if (err) return res.status(500).json({ error: 'خطا در لغو نوبت' });
                res.json({ message: 'نوبت با موفقیت لغو شد' });
            });
        }
    );
});

module.exports = router;