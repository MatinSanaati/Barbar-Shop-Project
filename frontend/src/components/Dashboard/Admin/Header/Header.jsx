// src/components/Header.jsx
import React, { useState } from "react";
import sunIcon from "../../../../assets/icons/sun.svg";
import moonIcon from "../../../../assets/icons/moon.svg";

import './Header.css';

const Header = ({ toggleSidebar, sidebarOpen, theme, toggleTheme }) => {
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <header className="header">
            {/* دکمه Toggle سایدبار */}
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {sidebarOpen ? "❌" : "☰"}
            </button>

            {/* لوگو / عنوان */}
            <div className="header-title">پنل مدیریت آرایشگاه</div>

            {/* دکمه‌ها سمت راست */}
            <div className="header-actions">
                {/* دکمه تغییر تم */}
                <button className="theme-btn" onClick={toggleTheme}>
                    <img src={theme === "dark" ? sunIcon : moonIcon} alt="تم" />
                </button>

                {/* پروفایل */}
                <div
                    className="profile"
                    onMouseEnter={() => setProfileOpen(true)}
                    onMouseLeave={() => setProfileOpen(false)}
                >
                    <button className="avatar">👤</button>
                    {profileOpen && (
                        <ul className="profile-menu">
                            <li>پروفایل من</li>
                            <li>تنظیمات</li>
                            <li>خروج</li>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
