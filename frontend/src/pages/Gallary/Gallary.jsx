// src/pages/GalleryPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import './Gallery.css';

const GalleryPage = () => {
    // 🔹 State برای مدیریت تم
    const [theme, setTheme] = useState('dark');

    // 🔹 داده‌های گالری
    const images = [
        "https://images.unsplash.com/photo-1562832918-d871ef8da87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        "https://images.unsplash.com/photo-1517433456460-15a80bcfdc88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        "https://images.unsplash.com/photo-1595695869231-7b8a3f93522e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        "https://images.unsplash.com/photo-1588361862520-8b7d774401fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        "https://images.unsplash.com/photo-1584433144874-dbe455b35f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
        "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    ];

    // 🔹 Intersection Observer برای انیمیشن ورود
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.2 }
        );

        const items = document.querySelectorAll(".gallery-item");
        items.forEach(item => observer.observe(item));

        return () => observer.disconnect();
    }, []);

    // 🔹 بارگذاری تم از localStorage هنگام mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // 🔹 تابع تغییر تم
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="gallery-page" dir="rtl">
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="gallery-main">
                <section className="gallery-section">
                    <div className="gallery-header">
                        <h2 className="gallery-title">گالری ما</h2>
                        <div className="underline"></div>
                        <p className="gallery-subtitle">
                            مشتریان واقعی، تغییرات واقعی – تفاوت را ببینید
                        </p>
                    </div>
                    <div className="gallery-grid">
                        {images.map((img, idx) => (
                            <div key={idx} className={`gallery-item fade-in-up delay-${idx + 1}`}>
                                <img src={img} alt={`تصویر ${idx + 1}`} />
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default GalleryPage;