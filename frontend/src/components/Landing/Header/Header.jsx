import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SunIcon from "../../icons/Sun-Icon";
import MoonIcon from "../../icons/Moon-Icon";

import "./Header.css";
import UserRegistrationIcon from "../../icons/User-Login-Icon";

const Header = ({ theme, toggleTheme }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // آیتم‌های منو
    const menuItems = [
        { path: "/services", label: "خدمات" },
        { path: "/about", label: "درباره ما" },
        { path: "/taking-turns", label: "نوبت‌دهی" },
        { path: "/contact", label: "تماس با ما" },
        { path: "/blog", label: "بلاگ" },
        { path: "/help", label: "راهنما" },
        { path: "/gallery", label: "گالری" },
    ];

    return (
        <>
            {/* ========== هدر اصلی ========== */}
            <header className="main-header">
                <div className="container">

                    {/* دکمه منوی موبایل */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "بستن منو" : "باز کردن منو"}
                    >
                        <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                    </button>

                    {/* لوگو */}
                    <Link to="/" className="logo">
                        <i className="fas fa-cut"></i>
                        <span>آرایشگاه مردانه</span>
                    </Link>

                    {/* ناوبری دسکتاپ */}
                    <nav className="desktop-nav">
                        <ul>
                            {menuItems.map((item) => (
                                <li key={item.path}>
                                    <Link to={item.path} className="nav-link">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* دکمه‌های عملیاتی: تم و پروفایل */}
                    <div className="header-actions">

                        {/* آواتار کاربر */}
                        <Link to="/auth-layout" className="profile-avatar-link" aria-label="ورود به حساب کاربری">
                            <UserRegistrationIcon className="user-registration-icon-svg" size={36} />
                        </Link>

                        {/* دکمه تم */}
                        <button className="theme-btn" onClick={toggleTheme} aria-label="تغییر تم">
                            {theme === "dark" ? (
                                <SunIcon className="theme-icon" size={24} />
                            ) : (
                                <MoonIcon className="theme-icon" size={24} />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* ========== منوی موبایل (Overlay) ========== */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
                <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                    <div className="mobile-header">
                        <Link to="/" className="mobile-logo" onClick={() => setMobileMenuOpen(false)}>
                            <i className="fas fa-cut"></i>
                            <span>آرایشگاه مردانه</span>
                        </Link>
                        <button
                            className="close-btn"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="بستن منو"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <ul className="mobile-nav-list">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="mobile-nav-link"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;