// backend/routes/siteRoutes.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

// 🔹 دریافت همه خدمات
router.get('/services', (req, res) => {
    db.all("SELECT * FROM services ORDER BY id", (err, rows) => {
        if (err) {
            console.error('❌ خطا در دریافت خدمات:', err);
            return res.status(500).json({ error: 'خطا در دریافت خدمات' });
        }
        res.json(rows);
    });
});

// 🔹 دریافت همه تصاویر گالری
router.get('/gallery', (req, res) => {
    db.all("SELECT * FROM gallery ORDER BY id", (err, rows) => {
        if (err) {
            console.error('❌ خطا در دریافت گالری:', err);
            return res.status(500).json({ error: 'خطا در دریافت گالری' });
        }
        res.json(rows);
    });
});

// 🔹 دریافت اطلاعات سایت (عکس‌ها و متن‌ها)
router.get('/site-info', (req, res) => {
    res.json({
        hero: {
            title: "تجربه آرایش مردانه در سطح حرفه‌ای",
            description: "با سیستم نوبت‌دهی آنلاین ما، هر زمان و مکان نوبت خود را رزرو کنید و از خدمات تخصصی استایلیست‌های برتر لذت ببرید.",
            image: "/images/hero.jpg" // این عکس رو توی پوشه public/images بذار
        },
        about: {
            title: "درباره آرایشگاه BARBER SHOP",
            paragraphs: [
                "آرایشگاه BARBER SHOP با هدف ارائه خدمات آرایشی مردانه در سطحی حرفه‌ای و با کیفیت بالا تأسیس شده است. تیم ما از استایلیست‌های مجرب و با تجربه تشکیل شده که همواره در تلاشند تا بهترین خدمات را به مشتریان عزیز ارائه دهند.",
                "ما با استفاده از جدیدترین تکنیک‌ها و بهترین محصولات موجود در بازار، تجربه‌ای منحصر به فرد از آرایش مردانه را برای شما فراهم می‌کنیم.",
                "محیط آرام و دوستانه آرایشگاه، تجهیزات مدرن و خدمات شخصی‌سازی شده، همه و همه باعث شده تا BARBER SHOP به یکی از محبوب‌ترین آرایشگاه‌های مردانه در منطقه تبدیل شود."
            ],
            image: "/images/about.jpg" // این عکس رو هم بذار توی public/images
        }
    });
});

module.exports = router;