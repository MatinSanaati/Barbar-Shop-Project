// routes/appointmentRoutes.js
const express = require('express')
const router = express.Router()
const db = require('../../config/db')
const auth = require('../../middleware/auth')

// 🔹 ثبت نوبت جدید
router.post('/appointments', auth, (req, res) => {
    const { service, date, time } = req.body
    const userId = req.user.id

    if (!service || !date || !time) {
        return res.status(400).json({ error: 'تمام فیلدها الزامی هستند' })
    }

    db.get(
        'SELECT * FROM turns WHERE user_id = ? AND date = ? AND time = ?',
        [userId, date, time],
        (err, existing) => {
            if (err) return res.status(500).json({ error: 'خطا در بررسی نوبت' })
            if (existing) return res.status(409).json({ error: 'شما قبلاً نوبتی در این تاریخ و زمان دارید' })

            const stmt = db.prepare(`
                INSERT INTO turns (user_id, service, date, time, status)
                VALUES (?, ?, ?, ?, 'pending')
            `)
            stmt.run([userId, service, date, time], function (err) {
                if (err) return res.status(500).json({ error: 'خطا در ثبت نوبت' })
                res.status(201).json({
                    message: 'نوبت با موفقیت ثبت شد',
                    appointment: { id: this.lastID, service, date, time, status: 'pending' }
                })
            })
            stmt.finalize()
        }
    )
})

module.exports = router