import React, { useState } from "react";
import LoginForm from "./Login-Form";
import RegisterForm from "./Register-Form";
import "./Auth-Layout.css";

const AuthLayoutPage = () => {
    const [currentForm, setCurrentForm] = useState("login");

    const renderForm = () => {
        switch (currentForm) {
            case "login":
                return <LoginForm onSwitch={setCurrentForm} />;
            case "register":
                return <RegisterForm onSwitch={setCurrentForm} />;
            default:
                return <LoginForm onSwitch={setCurrentForm} />;
        }
    };

    return (
        <div className="auth-layout">
            {/* پس‌زمینه عکس آرایشگاه */}
            <div className="auth-background"></div>

            {/* فرم وسط صفحه */}
            <div className="auth-form-center">
                <div className="auth-form-card">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
};

export default AuthLayoutPage;