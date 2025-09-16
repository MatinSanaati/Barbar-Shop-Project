const User = require('../models/User');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// ثبت‌نام کاربر جدید
exports.register = async (req, res) => {
    console.log('درخواست ثبت‌نام دریافت شد:', req.body);
    try {
        const { name, phone } = req.body;

        if (!name || !phone) {
            console.log('فیلد‌های ضروری وجود ندارند');
            return res.status(400).json({ error: 'نام و شماره تلفن الزامی هستند' });
        }
        console.log('در حال ثبت کاربر:', { name, phone });

        const newUser = await User.register({ name, phone });
        console.log('کاربر با موفقیت ساخته شد:', newUser);

        // ✅ ساخت JWT
        const token = jwt.sign(
            { id: newUser.id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // ✅ ارسال توکن با کوکی امن
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            path: '/'
        });

        res.status(201).json({
            message: 'کاربر با موفقیت ثبت‌نام شد',
            user: { id: newUser.id, name: newUser.name, phone: newUser.phone, role: newUser.role }
        });
    } catch (err) {
        console.error('خطا در ثبت‌نام:', err.message);
        res.status(400).json({ error: err.message });
    }
};

// ورود کاربر
exports.login = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ error: 'شماره تلفن الزامی است' });
        }

        // چک کردن وجود کاربر در دیتابیس
        const user = await User.login(phone);

        // ✅ به‌روزرسانی زمان آخرین لاگین — با PostgreSQL
        await db.query("UPDATE users SET last_login = NOW() WHERE id = $1", [user.id])
            .catch(err => {
                console.error('❌ خطا در به‌روزرسانی last_login:', err.message);
            });

        // تعیین نقش
        const role = phone === process.env.ADMIN_PHONE ? 'admin' : user.role;

        // ساخت JWT
        const token = jwt.sign(
            { id: user.id, role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // ارسال توکن با کوکی
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            path: '/'
        });

        res.json({
            message: 'ورود موفقیت‌آمیز',
            user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                role
            }
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

// اضافه کردن متد logout
exports.logout = (req, res) => {
    // حذف کوکی امن
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.json({ message: 'خروج موفقیت‌آمیز' });
};