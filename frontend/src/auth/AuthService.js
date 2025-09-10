import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // آدرس API بک‌اند خودت

// ورود
const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data)); // ذخیره توکن و اطلاعات کاربر
    }
    return response.data;
};

// ثبت‌نام
const register = async (data) => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
};

// فراموشی رمز عبور (ارسال ایمیل)
const forgotPassword = async (email) => {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
};

// ریست رمز عبور (لینک با توکن میاد)
const resetPassword = async (token, newPassword) => {
    const response = await axios.post(`${API_URL}/reset-password`, { token, password: newPassword });
    return response.data;
};

// گرفتن اطلاعات کاربر لاگین شده
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

// خروج
const logout = () => {
    localStorage.removeItem("user");
};

const AuthService = {
    login,
    register,
    forgotPassword,
    resetPassword,
    getCurrentUser,
    logout,
};

export default AuthService;
