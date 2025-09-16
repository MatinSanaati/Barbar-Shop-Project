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

    db.get(
        'SELECT * FROM turns WHERE user_id = ? AND date = ? AND time = ?',
        [userId, date, time],
        (err, existing) => {
            if (err) return res.status(500).json({ error: 'خطا در بررسی نوبت' });
            if (existing) return res.status(409).json({ error: 'شما قبلاً نوبتی در این تاریخ و زمان دارید' });

            const stmt = db.prepare(`
        INSERT INTO turns (user_id, service, date, time, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, 'pending', datetime('now'), datetime('now'))
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
            if (err) return res.status(500).json({ error: 'خطا در دریافت نوبت‌ها' });
            res.json({ appointments });
        }
    );
});

// 🔹 دریافت تاریخ‌های رزرو شده (برای تقویم)
router.get('/appointments/booked-dates', auth, (req, res) => {
    db.all(
        "SELECT DISTINCT date FROM turns WHERE status != 'canceled'",
        [],
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            const dates = rows.map(r => r.date);
            res.json(dates);
        }
    );
});

// 🔹 لغو نوبت توسط کاربر (PATCH)
router.patch('/appointments/:id/cancel', auth, (req, res) => {
    const id = req.params.id;
    db.run(
        "UPDATE turns SET status='canceled', updated_at=datetime('now') WHERE id=? AND user_id=?",
        [id, req.user.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'نوبت پیدا نشد' });
            res.json({ message: 'نوبت لغو شد' });
        }
    );
});

// 🔹 آپدیت نوبت (تغییر تاریخ/ساعت/سرویس)
router.put('/appointments/:id', auth, (req, res) => {
    const { date, time, service } = req.body;
    const id = req.params.id;

    if (!date || !time) return res.status(400).json({ error: 'تاریخ و ساعت لازم است' });

    db.get(
        "SELECT * FROM turns WHERE date=? AND time=? AND status!='canceled' AND id!=?",
        [date, time, id],
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (row) return res.status(400).json({ error: 'این زمان قبلاً رزرو شده' });

            db.run(
                "UPDATE turns SET date=?, time=?, service=?, updated_at=datetime('now') WHERE id=? AND user_id=?",
                [date, time, service || 'general', id, req.user.id],
                function (err) {
                    if (err) return res.status(500).json({ error: err.message });
                    if (this.changes === 0) return res.status(404).json({ error: 'نوبت پیدا نشد' });
                    res.json({ message: 'نوبت آپدیت شد' });
                }
            );
        }
    );
});

module.exports = router;