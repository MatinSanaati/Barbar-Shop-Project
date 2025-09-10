// src/components/Dashboard/Hairdresser/Header/Header.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import sunIcon from "../../../../assets/icons/sun.svg";
import moonIcon from "../../../../assets/icons/moon.svg";
import userIcon from '../../../../assets/icons/user.svg';

import "./Header.css";

const Header = ({ theme, toggleTheme }) => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        {
            path: "/hairdresser/work-plan",
            icon: "fas fa-calendar-alt",
            label: "برنامه کاری"
        },
        {
            path: "/hairdresser/turns",
            icon: "fas fa-calendar-check",
            label: "نوبت‌های من"
        },
        {
            path: "/hairdresser/customers",
            icon: "fas fa-users",
            label: "مشتریان"
        },
        {
            path: "/hairdresser/report",
            icon: "fas fa-chart-line",
            label: "گزارش‌ها"
        },
    ];

    return (
        <>
            <header className="hairdresser-header">
                <div className="header-content">
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="باز کردن منو"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="logo">
                        <Link to="/hairdresser/dashboard">
                            <i className="fas fa-cut logo-icon"></i>
                            <span className="logo-text">آرایشگاه مردانه</span>
                        </Link>
                    </div>

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

                    <div className="warpper-btns">
                        <Link to="/hairdresser/profile" className="signup-btn">
                            <img src={userIcon} alt="پروفایل" className="user-icon" />
                        </Link>
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label="تغییر تم"
                            title={`تغییر به تم ${theme === "dark" ? "روشن" : "تاریک"}`}
                        >
                            <img
                                src={theme === "dark" ? sunIcon : moonIcon}
                                alt={theme === "dark" ? "light" : "dark"}
                                className="theme-icon"
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* منوی موبایل */}
            <div
                className={`hairdresser-mobile-overlay ${mobileMenuOpen ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
            >
                <div
                    className="hairdresser-mobile-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="hairdresser-mobile-header">
                        <Link to="/hairdresser/dashboard" onClick={() => setMobileMenuOpen(false)} className="mobile-logo-link">
                            <i className="fas fa-cut mobile-logo-icon"></i>
                            <span className="mobile-logo-text">آرایشگاه مردانه</span>
                        </Link>
                        <button
                            className="hairdresser-mobile-close"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="بستن منو"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <ul className="hairdresser-mobile-items">
                        {menuItems.map(({ path, icon, label }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={
                                        isActive(path) ? "hairdresser-mobile-link active" : "hairdresser-mobile-link"
                                    }
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