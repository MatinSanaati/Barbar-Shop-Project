// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
    const location = useLocation();

    const menuItems = [
        { path: "/admin/dashboard", label: "داشبورد" },
        { path: "/admin/turns", label: "نوبت‌ها" },
        { path: "/admin/hairdressers", label: "آرایشگران" },
        { path: "/clients", label: "مشتریان" },
        { path: "/services", label: "خدمات" },
        { path: "/reports", label: "گزارش‌ها" },
        { path: "/settings", label: "تنظیمات" },
    ];

    return (
        <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div className="sidebar-header">
                <h2>پنل ادمین</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
                            <Link to={item.path}>
                                <span className="icon">{item.icon}</span>
                                <span className="label">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
