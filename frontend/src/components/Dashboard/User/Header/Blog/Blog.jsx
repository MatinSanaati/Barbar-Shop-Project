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
            title: 'The Art of the Classic Fade',
            excerpt: 'How to achieve the perfect fade cut with precision and symmetry.',
            date: 'Apr 28, 2025',
            category: 'Haircut'
        },
        {
            title: 'Beard Grooming Essentials',
            excerpt: 'Must-have products and routines for a healthy, stylish beard.',
            date: 'Apr 15, 2025',
            category: 'Beard'
        },
        {
            title: 'Styling Tips for Thick Hair',
            excerpt: 'Manage volume, reduce frizz, and enhance texture with these pro tips.',
            date: 'Mar 30, 2025',
            category: 'Style'
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
            case 'Haircut':
                return 'badge-gold';
            case 'Beard':
                return 'badge-green';
            case 'Style':
                return 'badge-blue';
            default:
                return 'badge-gold';
        }
    };

    return (
        <div className="blog-page">
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="blog-main">
                <section className="blog-section">
                    <div className="blog-header">
                        <h2 className="blog-title">Barber Journal</h2>
                        <div className="underline"></div>
                        <p className="blog-subtitle">Tips, trends, and grooming advice from the chair</p>
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
                                    <i className="fas fa-arrow-right read-more"></i>
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