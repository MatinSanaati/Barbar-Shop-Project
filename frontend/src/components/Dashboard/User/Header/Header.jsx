import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import SunIcon from "../../../icons/Sun-Icon";
import MoonIcon from "../../../icons/Moon-Icon";
import UserProfileIcon from "../../../icons/User-Profile-Icon";

const Header = ({ theme, toggleTheme }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const menuItems = [
        { path: "/user/services", label: "خدمات" },
        { path: "/user/about", label: "درباره من" },
        { path: "/user/taking-turns", label: "نوبت‌ دهی" },
        { path: "/user/contact", label: "تماس با من" },
        { path: "/user/blog", label: "بلاگ" },
        { path: "/user/my-turns", label: "نوبت های من" },
    ];

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/users/logout", {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) window.location.href = "/";
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <>
            <header className="main-header">
                <div className="header-container">
                    {/* منوی موبایل */}
                    <button
                        className="menu-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="منوی موبایل"
                    >
                        <i className={mobileOpen ? "fas fa-times" : "fas fa-bars"}></i>
                    </button>

                    {/* لوگو */}
                    <Link to="/user" className="logo">
                        <i className="fas fa-cut"></i>
                        <span>آرایشگاه مردانه</span>
                    </Link>

                    {/* منوی دسکتاپ */}
                    <nav className="nav-desktop">
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

                    {/* اکشن‌ها */}
                    <div className="actions">
                        {/* پروفایل */}
                        <div className="profile">
                            {/* دکمه آواتار — فقط دکمه است، نه لینک */}
                            <button
                                className="profile-icon-btn"
                                type="button"
                                aria-label="منوی پروفایل"
                                onClick={() => {
                                    // فقط در حالت موبایل با کلیک باز/بسته شه
                                    if (window.innerWidth <= 768) {
                                        setProfileDropdownOpen(prev => !prev);
                                    }
                                }}
                            >
                                <UserProfileIcon size={34} />
                            </button>

                            {/* منوی پروفایل */}
                            <ul
                                className={`profile-dropdown ${profileDropdownOpen ? 'open' : ''}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <li>
                                    <Link to="/user/profile" className="dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                                        <i className="fas fa-user"></i> پروفایل
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user/settings" className="dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                                        <i className="fas fa-cog"></i> تنظیمات
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => {
                                            handleLogout();
                                            setProfileDropdownOpen(false);
                                        }}
                                    >
                                        <i className="fas fa-sign-out-alt"></i> خروج
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* دکمه تم */}
                        <button className="theme-btn" onClick={toggleTheme}>
                            {theme === "dark" ? (
                                <SunIcon className="theme-icon" size={22} />
                            ) : (
                                <MoonIcon className="theme-icon" size={22} />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Overlay برای بستن منو با کلیک بیرون (فقط موبایل) */}
            {profileDropdownOpen && window.innerWidth <= 768 && (
                <div
                    className="profile-dropdown-overlay"
                    onClick={() => setProfileDropdownOpen(false)}
                ></div>
            )}

            {/* منوی موبایل */}
            <div
                className={`mobile-menu-overlay ${mobileOpen ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
            >
                <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                    <div className="mobile-header">
                        <Link to="/user" className="mobile-logo">
                            <i className="fas fa-cut"></i>
                            <span>آرایشگاه مردانه</span>
                        </Link>
                        <button
                            className="close-btn"
                            onClick={() => setMobileOpen(false)}
                            aria-label="بستن"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <ul className="mobile-nav">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className="mobile-link"
                                    onClick={() => setMobileOpen(false)}
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