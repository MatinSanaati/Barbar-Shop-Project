import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

import SunIcon from "../../../icons/Sun-Icon";
import MoonIcon from "../../../icons/Moon-Icon";
import UserProfileIcon from "../../../icons/User-Profile-Icon";
import { Link } from "react-router-dom";

const Header = ({ initialTheme = "light" }) => {
    const menuItems = [
        { path: "/user/my-turns", label: "نوتب های من" },
        { path: "/user/blog", label: "بلاگ" },
        { path: "/user/contact", label: "تماس با من" },
        { path: "/user/taking-turns", label: "نوبت‌ دهی" },
        { path: "/user/about", label: "درباره من" },
        { path: "/user/services", label: "خدمات" },
    ];

    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || initialTheme;
    });

    const menuRef = useRef(null);
    const lastActiveRef = useRef(null);

    // اعمال تم و ذخیره در localStorage
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // اسکرول هدر
    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 20);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // کلید Escape برای موبایل
    useEffect(() => {
        function onKey(e) {
            if (!mobileOpen) return;
            if (e.key === "Escape") closeMobile();
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [mobileOpen]);

    function openMobile() {
        lastActiveRef.current = document.activeElement;
        setMobileOpen(true);
        document.body.style.overflow = "hidden";
    }

    function closeMobile() {
        setMobileOpen(false);
        document.body.style.overflow = "";
        if (lastActiveRef.current) lastActiveRef.current.focus();
    }

    function toggleTheme() {
        setTheme((t) => (t === "dark" ? "light" : "dark"));
    }

    return (
        <>
            <header
                className={`header-root ${scrolled ? "header-scrolled" : ""}`}
            >
                <div className="header-container" style={{ justifyContent: "space-between" }}>
                    {/* سمت راست: لوگو + همبرگر */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", flexDirection: "row-reverse" }}>
                        {/* لوگو */}
                        <div className="brand">
                            <Link to="/" className="brand-link">
                                <i className="fas fa-cut"></i>
                                <span>آرایشگاه مردانه</span>
                            </Link>
                        </div>

                        {/* دکمه موبایل */}
                        <button
                            className={`mobile-toggle ${mobileOpen ? "open" : ""}`}
                            aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            onClick={() => (mobileOpen ? closeMobile() : openMobile())}
                        >
                            <span className="hamburger">
                                <span></span><span></span><span></span>
                            </span>
                        </button>
                    </div>

                    {/* ناوبری دسکتاپ */}
                    <nav className="nav-desktop" aria-label="ناوبری اصلی">
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

                    {/* سمت چپ: دکمه لاگین + تغییر تم */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        {/* دکمه لاگین */}
                        <Link to="/user/profile" className="profile-btn" aria-label="ورود">
                            <UserProfileIcon size={34} />
                        </Link>

                        {/* دکمه تم */}
                        <button className="theme-toggle" onClick={toggleTheme} aria-label="تغییر تم">
                            {theme === "dark" ? <SunIcon className="theme-icon" size={22} /> : <MoonIcon className="theme-icon" size={22} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* منوی موبایل */}
            <div
                className={`mobile-overlay ${mobileOpen ? "active" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-hidden={!mobileOpen}
                onClick={closeMobile}
            >
                <aside className="mobile-panel" ref={menuRef} onClick={(e) => e.stopPropagation()} id="mobile-menu">
                    <div className="mobile-panel-header">
                        <Link to="/" className="mobile-brand">
                            <i className="fas fa-cut"></i>
                            <span>آرایشگاه مردانه</span>
                        </Link>
                        <button className="mobile-close" aria-label="بستن منو" onClick={closeMobile}>
                            &times;
                        </button>
                    </div>

                    <nav className="mobile-nav" aria-label="منوی موبایل">
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
                    </nav>
                </aside>
            </div>
        </>
    );
};

export default Header;