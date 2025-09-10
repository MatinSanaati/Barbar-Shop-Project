const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middlewareها
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ✅ اول: روت‌های خاص (با پیشوند کامل)
app.use('/api/users', require('./routes/userRoutes'));

// ✅ بعد: روت‌های عمومی (مثل /api/services)
app.use('/api', require('./routes/siteRoutes'));

// تست
app.get('/', (req, res) => {
    res.send('سلام! سرور در حال اجراست.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 سرور در http://localhost:${PORT} فعال شد`);
});