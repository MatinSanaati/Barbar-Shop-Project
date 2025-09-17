const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('🎯 DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'NOT FOUND');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // ضروری برای Render
        }
    },
    logging: console.log // نمایش دستورات SQL
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ اتصال به دیتابیس با موفقیت انجام شد.');
    } catch (error) {
        console.error('❌ خطا در اتصال به دیتابیس:', error.message);
    } finally {
        await sequelize.close();
    }
}

testConnection();