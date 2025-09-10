import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import sunIcon from "../../../assets/icons/sun.svg";
import moonIcon from "../../../assets/icons/moon.svg";
import userLogin from '../../../assets/icons/user-login.svg';

import "./Header.css";

const Header = ({ theme, toggleTheme }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { path: "/services", icon: "fas fa-concierge-bell", label: "خدمات" },
        { path: "/about", icon: "fas fa-info-circle", label: "درباره من" },
        { path: "/taking-turns", icon: "fas fa-calendar-check", label: "نوبت‌ دهی" },
        { path: "/contact", icon: "fas fa-phone", label: "تماس با من" },
        { path: "/blog", icon: "fas fa-blog", label: "بلاگ" },
        { path: "/help", icon: "fas fa-question-circle", label: "راهنما" },
    ];

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:5000/api/users/logout", {
                method: "POST",
                credentials: "include"
            });
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.error("خطا در خروج:", err);
        }
    };

    return (
        <>
            <header className="main-header">
                <div className="header-container">
                    {/* دکمه منوی موبایل */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="باز کردن منو"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* لوگو */}
                    <div className="logo">
                        <Link to="/">
                            <i className="fas fa-cut logo-icon"></i>
                            <span className="logo-text">آرایشگاه مردانه</span>
                        </Link>
                    </div>

                    {/* ناوبری دسکتاپ */}
                    <nav className="desktop-nav">
                        <ul>
                            {menuItems.map(({ path, icon, label }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={isActive(path) ? "nav-link active" : "nav-link"}
                                    >
                                        <i className={icon}></i> {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* دکمه‌ها: تم و پروفایل */}
                    <div className="header-actions">

                        {/* آواتار پروفایل */}
                        <div className="profile-menu">
                            <button className="profile-avatar" aria-haspopup="true">
                                <img src={userLogin} alt="پروفایل کاربر" className="user-icon" />
                            </button>

                            {/* منوی پروفایل */}
                            <ul className="profile-dropdown">
                                <li>
                                    <Link to="/">
                                        <i className="fas fa-user"></i> پروفایل من
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        <i className="fas fa-cog"></i> تنظیمات
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="logout-btn">
                                        <i className="fas fa-sign-out-alt"></i> خروج
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* دکمه تم */}
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label="تغییر تم"
                        >
                            <img
                                src={theme === "dark" ? sunIcon : moonIcon}
                                alt={theme === "dark" ? "روشن" : "تاریک"}
                                className="theme-icon"
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* منوی موبایل */}
            <div
                className={`mobile-overlay ${mobileMenuOpen ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
            >
                <div
                    className="mobile-menu"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="mobile-header">
                        <Link to="/user" className="mobile-logo">
                            <i className="fas fa-cut"></i>
                            <span>آرایشگاه مردانه</span>
                        </Link>
                        <button
                            className="mobile-close"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <ul className="mobile-items">
                        {menuItems.map(({ path, icon, label }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={isActive(path) ? "active" : ""}
                                >
                                    <i className={icon}></i> {label}
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