const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/userController');
const auth = require('../middleware/auth');

// ✅ ثبت‌نام
router.post('/register', register);

// ✅ ورود (قدیمی — بعداً حذف میشه)
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

//  خروج
router.post('/logout', auth, logout);

module.exports = router;