import React, { useState } from "react";
import "./Login-Form.css";

// تابع تشخیص فارسی بودن
const isPersian = (text) => {
    if (!text) return false;
    const persianRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    return persianRegex.test(text);
};

const LoginForm = ({ onSwitch }) => {
    const [loginData, setLoginData] = useState({
        name: "",
        phone: "",
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setLoginData((prev) => ({ ...prev, [field]: value }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        // اعتبارسنجی فرم
        const newErrors = {};
        if (!loginData.name.trim()) newErrors.name = "نام الزامی است";
        if (!loginData.phone.trim()) newErrors.phone = "شماره تلفن الزامی است";
        if (!/^09[0-9]{9}$/.test(loginData.phone)) newErrors.phone = "شماره نامعتبر است";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
                credentials: "include"
            });

            const data = await response.json();

            if (response.ok) {
                // ✅ هدایت بر اساس نقش
                const redirectPath = data.user.role === 'admin'
                    ? '/admin'
                    : data.user.role === 'hairdresser'
                        ? '/hairdresser'
                        : '/user';

                alert("ورود موفقیت‌آمیز");
                window.location.href = redirectPath;
            } else {
                setErrors({ submit: data.error });
            }
        } catch (err) {
            setErrors({ submit: "خطا در ارتباط با سرور" });
        }
    };
    
    return (
        <div className="login-form-wrapper">
            <div className="logo">
                <i className="fas fa-cut logo-icon"></i>
                <div className="logo-text">BARBER SHOP</div>
            </div>

            <div className="tabs">
                <div className="tab" onClick={() => onSwitch("register")}>
                    ثبت‌ نام
                </div>
                <div className="tab active">ورود</div>
            </div>

            <form onSubmit={handleLoginSubmit}>
                <h2 className="form-title">ورود به حساب کاربری</h2>

                {/* فیلد نام با label شناور */}
                <div className="form-group">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            id="name"
                            value={loginData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            dir={isPersian(loginData.name) ? "rtl" : "ltr"}
                            className={loginData.name ? "has-value" : ""}
                        />
                        <label htmlFor="name" className="floating-label">نام</label>
                        <i className="fas fa-user input-icon"></i>
                    </div>
                    {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                {/* فیلد شماره تلفن با label شناور */}
                <div className="form-group">
                    <div className="input-wrapper">
                        <input
                            type="tel"
                            id="phone"
                            value={loginData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            dir="ltr"
                            className={loginData.phone ? "has-value" : ""}
                        />
                        <label htmlFor="phone" className="floating-label">شماره تلفن</label>
                        <i className="fas fa-phone input-icon"></i>
                    </div>
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>

                {errors.submit && <div className="error-message">{errors.submit}</div>}

                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-sign-in-alt"></i> ورود
                </button>

                <div className="signup-link">
                    حساب کاربری ندارید؟{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); onSwitch("register"); }}>
                        ثبت‌ نام کنید
                    </a>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;