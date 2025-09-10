// src/layouts/Hairdresser/Hairdresser-Dashboard-Layout.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../components/Dashboard/Hairdresser/Header/Header';
import Footer from '../../components/Dashboard/Hairdresser/Footer/Footer';
import { Outlet } from 'react-router-dom'; // ✅ اینجا صفحات فرزند نمایش داده میشن

const HairdresserDashboardLayout = () => {
    const [theme, setTheme] = useState('dark');

    // بارگذاری تم از localStorage
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

    return (
        <div>
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default HairdresserDashboardLayout;