// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/userController');
const auth = require('../middleware/auth');
const db = require('../config/db');
const User = require('../models/User');

// ✅ ثبت‌نام
router.post('/register', register);

// ✅ ورود
router.post('/login', login);

// ✅ اطلاعات کاربر فعلی
router.get('/me', auth, (req, res) => {
    res.json({ user: req.user });
});

// ✅ آپدیت اطلاعات کاربر
router.post('/update', auth, async (req, res) => {
    const { name, phone } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;

    try {
        const user = await User.update(req.user.id, updates);
        res.json({ message: 'اطلاعات بروزرسانی شد', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ اطلاعات کامل پروفایل کاربر
router.get('/me/full-profile', auth, (req, res) => {
    const userId = req.user.id;

    const query = `
    SELECT 
        u.name, u.phone, u.created_at, u.last_login,
        p.avatar,
        (SELECT COUNT(*) FROM turns WHERE user_id = u.id AND status = 'pending') as pending_turns,
        (SELECT COUNT(*) FROM turns WHERE user_id = u.id AND status = 'confirmed') as confirmed_turns,
        (SELECT COUNT(*) FROM turns WHERE user_id = u.id) as total_turns
    FROM users u
    LEFT JOIN profiles p ON u.id = p.user_id
    WHERE u.id = $1
`;

    db.query(query, [userId])
        .then(result => {
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'کاربر یافت نشد' });
            }
            res.json({ profile: result.rows[0] });
        })
        .catch(err => {
            console.error('❌ خطا در دریافت اطلاعات:', err);
            res.status(500).json({ error: 'خطا در دریافت اطلاعات' });
        });
});

//  خروج
router.post('/logout', auth, logout);

module.exports = router;