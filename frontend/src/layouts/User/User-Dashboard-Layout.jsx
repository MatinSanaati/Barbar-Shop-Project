// src/layouts/User/User-Dashboard-Layout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const UserDashboardLayout = () => {
    const [theme, setTheme] = useState('dark');

    // بارگذاری تم
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // تغییر تم
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return <Outlet />
};

export default UserDashboardLayout;