// src/pages/AboutPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../../User/Header/Header';
import Footer from '../../../User/Footer/Footer';
import './About.css';

const AboutPage = () => {
    // 🔹 State برای مدیریت تم
    const [theme, setTheme] = useState('dark');

    // 🔹 Intersection Observer برای انیمیشن ورود
    useEffect(() => {
        const section = document.querySelector('.about-section');
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

        if (section) observer.observe(section);
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
        <div className="about-page">
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="about-main">
                <section className="about-section" id="about">
                    <div className="about-container">
                        {/* Text Content */}
                        <div className="about-text fade-in-left">
                            <h2 className="about-title">The Barber</h2>
                            <div className="underline"></div>
                            <p>
                                Ali has over 8 years of experience in men’s grooming, mastering the
                                art of precision cuts and timeless styles. His journey began in
                                Tehran, where he cultivated his passion for creating sharp,
                                personalized looks.
                            </p>
                            <p>
                                Every client is treated with care and attention, ensuring a unique
                                experience tailored to their lifestyle and personality. Ali believes
                                that grooming is more than a service — it’s a ritual of confidence
                                and style.
                            </p>
                            <p>
                                With a client-first mindset, his philosophy blends tradition and
                                modernity, offering classic techniques with a contemporary touch.
                            </p>
                        </div>

                        {/* Image */}
                        <div className="about-image fade-in-right">
                            <img
                                src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                                alt="Barber at work"
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;