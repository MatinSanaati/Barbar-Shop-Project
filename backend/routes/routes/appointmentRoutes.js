const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const auth = require('../../middleware/auth');

// 🔹 ثبت نوبت جدید
router.post('/appointments', auth, async (req, res) => {
    const { service, date, time } = req.body;
    const userId = req.user.id;

    if (!service || !date || !time) {
        return res.status(400).json({ error: 'تمام فیلدها الزامی هستند' });
    }

    try {
        const existing = await db.query(
            'SELECT * FROM turns WHERE user_id = $1 AND date = $2 AND time = $3 AND status != $4',
            [userId, date, time, 'canceled']
        );

        if (existing.rows.length > 0) {
            return res.status(409).json({ error: 'شما قبلاً نوبتی در این تاریخ و زمان دارید' });
        }

        const result = await db.query(
            `INSERT INTO turns (user_id, barber_id, service, date, time, status, created_at, updated_at)
       VALUES ($1, NULL, $2, $3, $4, 'pending', NOW(), NOW()) RETURNING *`,
            [userId, service, date, time]
        );

        res.status(201).json({
            message: 'نوبت با موفقیت ثبت شد',
            appointment: result.rows[0]
        });
    } catch (err) {
        console.error('خطا در ثبت نوبت:', err);
        res.status(500).json({ error: 'خطا در ثبت نوبت' });
    }
});

// 🔹 دریافت نوبت‌های کاربر
router.get('/appointments/me', auth, async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await db.query(
            `SELECT id, service, date, time, status FROM turns 
       WHERE user_id = $1 AND status != 'canceled'
       ORDER BY date DESC, time ASC`,
            [userId]
        );
        res.json({ appointments: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'خطا در دریافت نوبت‌ها' });
    }
});

// 🔹 دریافت تاریخ‌های رزرو شده
router.get('/appointments/booked-dates', auth, async (req, res) => {
    try {
        const result = await db.query(
            "SELECT DISTINCT date FROM turns WHERE status != 'canceled'"
        );
        const dates = result.rows.map(r => r.date);
        res.json(dates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 لغو نوبت
router.patch('/appointments/:id/cancel', auth, async (req, res) => {
    const id = req.params.id;

    try {
        const result = await db.query(
            "UPDATE turns SET status='canceled', updated_at=NOW() WHERE id=$1 AND user_id=$2",
            [id, req.user.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'نوبت پیدا نشد' });
        }

        res.json({ message: 'نوبت لغو شد' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 آپدیت نوبت
router.put('/appointments/:id', auth, async (req, res) => {
    const { date, time, service } = req.body;
    const id = req.params.id;

    if (!date || !time) return res.status(400).json({ error: 'تاریخ و ساعت لازم است' });

    try {
        const conflict = await db.query(
            "SELECT * FROM turns WHERE date=$1 AND time=$2 AND status!='canceled' AND id!=$3",
            [date, time, id]
        );

        if (conflict.rows.length > 0) {
            return res.status(400).json({ error: 'این زمان قبلاً رزرو شده' });
        }

        await db.query(
            "UPDATE turns SET date=$1, time=$2, service=$3, updated_at=NOW() WHERE id=$4 AND user_id=$5",
            [date, time, service || 'general', id, req.user.id]
        );

        res.json({ message: 'نوبت آپدیت شد' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;