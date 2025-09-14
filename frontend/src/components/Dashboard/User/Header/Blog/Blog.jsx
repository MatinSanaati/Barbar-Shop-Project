// src/pages/BlogPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../../User/Header/Header';
import Footer from '../../../User/Footer/Footer';
import './Blog.css';

const BlogPage = () => {
    // 🔹 State برای مدیریت تم
    const [theme, setTheme] = useState('dark');

    // 🔹 داده‌های بلاگ
    const posts = [
        {
            title: 'هنر فید کلاسیک',
            excerpt: 'چطور می‌توانید یک مدل فید بی‌نقص و متقارن بزنید.',
            date: '۹ اردیبهشت ۱۴۰۴',
            category: 'کوتاهی مو'
        },
        {
            title: 'ضروریات مراقبت از ریش',
            excerpt: 'محصولات و روتین‌هایی که برای داشتن ریش سالم و شیک لازم دارید.',
            date: '۲۶ فروردین ۱۴۰۴',
            category: 'ریش'
        },
        {
            title: 'نکات استایل موهای پرپشت',
            excerpt: 'چگونه حجم را کنترل کنید، وز را کاهش دهید و بافت مو را تقویت کنید.',
            date: '۱۰ فروردین ۱۴۰۴',
            category: 'استایل'
        }
    ];

    // 🔹 Intersection Observer برای انیمیشن ورود
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        const cards = document.querySelectorAll('.blog-card');
        cards.forEach((card) => observer.observe(card));

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

    // 🔹 تعیین کلاس دسته‌بندی
    const getCategoryClass = (category) => {
        switch (category) {
            case 'کوتاهی مو':
                return 'badge-gold';
            case 'ریش':
                return 'badge-green';
            case 'استایل':
                return 'badge-blue';
            default:
                return 'badge-gold';
        }
    };

    return (
        <div className="blog-page" dir="rtl">
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="blog-main">
                <section className="blog-section">
                    <div className="blog-header">
                        <h2 className="blog-title">مجله آرایشگاه</h2>
                        <div className="underline"></div>
                        <p className="blog-subtitle">
                            نکات، ترندها و مشاوره‌های حرفه‌ای در زمینه اصلاح و استایل
                        </p>
                    </div>
                    <div className="blog-grid">
                        {posts.map((post, idx) => (
                            <div key={idx} className={`blog-card fade-in-up delay-${idx + 1}`}>
                                <span className={`category-badge ${getCategoryClass(post.category)}`}>
                                    {post.category}
                                </span>
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-excerpt">{post.excerpt}</p>
                                <div className="post-footer">
                                    <span className="post-date">{post.date}</span>
                                    <i className="fas fa-arrow-left read-more"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPage;