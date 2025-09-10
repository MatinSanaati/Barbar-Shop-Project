const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/userController'); // ✅ logout اضافه شد
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);

router.get('/me', auth, (req, res) => {
    res.json({ user: req.user });
});

// backend/routes/userRoutes.js
router.post('/update', auth, async (req, res) => {
    const { name, phone } = req.body;
    try {
        const user = await User.update(req.user.id, { name, phone });
        res.json({ message: 'اطلاعات بروزرسانی شد', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ روت جدید: خروج کاربر
router.post('/logout', auth, logout); // فقط کاربران واردشده می‌تونن خروج کنن

module.exports = router;