const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'دسترسی مجاز نیست، لطفاً وارد شوید' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // گرفتن اطلاعات کامل کاربر از دیتابیس
        User.findById(decoded.id)
            .then(user => {
                req.user = user; // شامل name, phone, role
                next();
            })
            .catch(() => {
                return res.status(401).json({ error: 'کاربر یافت نشد' });
            });
    } catch (err) {
        return res.status(403).json({ error: 'توکن نامعتبر یا منقضی شده' });
    }
};

module.exports = auth;