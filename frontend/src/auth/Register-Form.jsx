import React, { useState } from "react";
import "./Register-Form.css";

// تابع تشخیص فارسی بودن
const isPersian = (text) => {
    if (!text) return false;
    const persianRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    return persianRegex.test(text);
};

const RegisterForm = ({ onSwitch }) => {
    const [registerData, setRegisterData] = useState({
        name: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setRegisterData((prev) => ({ ...prev, [field]: value }));
    };

    const validate = () => {
        let newErrors = {};
        if (!registerData.name.trim()) newErrors.name = "نام الزامی است.";
        if (!registerData.phone.trim()) newErrors.phone = "شماره تلفن الزامی است.";
        if (!/^09[0-9]{9}$/.test(registerData.phone))
            newErrors.phone = "شماره تلفن نامعتبر است";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}http://localhost:5000/api/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: registerData.name,
                    phone: registerData.phone,
                }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                alert("ثبت‌نام موفقیت‌آمیز بود");
                onSwitch("login");
            } else {
                setErrors({ submit: data.error || "خطا در ثبت‌نام" });
            }
        } catch (err) {
            setErrors({ submit: "خطا در ارتباط با سرور" });
        }
    };

    return (
        <div className="register-form-wrapper">
            <div className="logo">
                <i className="fas fa-cut logo-icon"></i>
                <div className="logo-text">BARBER SHOP</div>
            </div>

            <div className="tabs">
                <div className="tab active">ثبت‌نام</div>
                <div className="tab" onClick={() => onSwitch("login")}>
                    ورود
                </div>
            </div>

            <form onSubmit={handleRegisterSubmit}>
                <h2 className="form-title">ایجاد حساب کاربری</h2>

                {/* فیلد نام با label شناور */}
                <div className="form-group">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            id="name"
                            value={registerData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            dir={isPersian(registerData.name) ? "rtl" : "ltr"}
                            className={registerData.name ? "has-value" : ""}
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
                            value={registerData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            dir="ltr"
                            className={registerData.phone ? "has-value" : ""}
                        />
                        <label htmlFor="phone" className="floating-label">شماره تلفن</label>
                        <i className="fas fa-phone input-icon"></i>
                    </div>
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>

                {errors.submit && <div className="error-message">{errors.submit}</div>}

                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-user-plus"></i> ثبت‌ نام
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;