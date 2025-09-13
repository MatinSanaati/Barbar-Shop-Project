// utils/smsService.js
const axios = require('axios');

/**
 * ارسال کد OTP با سرویس Salam.ir (جایگزین کیو تی)
 */
const sendOTP = async (phone, otp) => {
    const token = process.env.SMS_API_TOKEN; // توکن از Salam.ir
    const templateId = 'login-otp'; // نام قالبی که توی پنل ساختی

    try {
        const response = await axios.post(
            'https://api.salam.ir/v1/sms/send/verify',
            {
                mobile: phone,
                template: templateId,
                tokens: { code: otp }
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.success) {
            console.log(`✅ کد OTP با موفقیت به ${phone} ارسال شد`);
            return true;
        } else {
            console.error('❌ خطا در ارسال پیام:', response.data.message);
            return false;
        }
    } catch (error) {
        console.error('❌ خطای ارتباط با Salam.ir:', error.message);
        return false;
    }
};

module.exports = { sendOTP };