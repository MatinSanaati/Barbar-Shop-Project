import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import SunIcon from "../../../icons/Sun-Icon";
import MoonIcon from "../../../icons/Moon-Icon";
import UserProfileIcon from "../../../icons/User-Profile-Icon";

const Header = ({ theme, toggleTheme }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // آیتم‌های منو
    const menuItems = [
        { path: "/user/services", label: "خدمات" },
        { path: "/user/about", label: "درباره ما" },
        { path: "/user/taking-turns", label: "نوبت‌دهی" },
        { path: "/user/contact", label: "تماس با ما" },
        { path: "/user/blog", label: "بلاگ" },
        { path: "/user/help", label: "راهنما" },
        { path: "/user/gallery", label: "گالری" },
    ];

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users/logout", {
                method: "POST",
                credentials: "include", // مهم: کوکی‌ها رو میفرسته
            });

            if (response.ok) {
                // بعد از خروج موفق
                window.location.href = "/";
            } else {
                console.error("خطا در خروج کاربر");
            }
        } catch (error) {
            console.error("مشکل در ارتباط با سرور:", error);
        }
    };

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
                    <Link to="/user" className="logo">
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
                        {/* منوی پروفایل */}
                        <div className="profile-menu">
                            <div className="profile-avatar-wrapper">
                                <Link to="/user/profile" className="profile-avatar-link" aria-label="پروفایل کاربر">
                                    <UserProfileIcon className="user-icon-svg" size={36} />
                                </Link>
                            </div>

                            {/* منوی پروفایل - ظاهر شده با :hover */}
                            <ul className="profile-dropdown">
                                <li>
                                    <Link to="/user/profile" className="dropdown-link">
                                        <i className="fas fa-user"></i>
                                        <span>پروفایل</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user/settings" className="dropdown-link">
                                        <i className="fas fa-cog"></i>
                                        <span>تنظیمات</span>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-link logout-btn"
                                        onClick={handleLogout}
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                        <span>خروج</span>
                                    </button>
                                </li>
                            </ul>
                        </div>

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
                        <Link to="/user" className="mobile-logo" onClick={() => setMobileMenuOpen(false)}>
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