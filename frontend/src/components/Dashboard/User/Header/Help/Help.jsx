// src/pages/HelpPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../../User/Header/Header';
import Footer from '../../../User/Footer/Footer';
import './Help.css';

const HelpPage = () => {
    // 🔹 State برای مدیریت تم
    const [theme, setTheme] = useState('dark');

    // 🔹 داده‌های سوالات متداول
    const faqs = [
        {
            question: "How do I book an appointment?",
            answer: "Visit the 'Book Now' page, select your service, date, and time. Confirm your details to reserve your spot."
        },
        {
            question: "What if I'm late for my appointment?",
            answer: "Please arrive on time. If you're more than 10 minutes late, your appointment may be canceled."
        },
        {
            question: "Can I reschedule my appointment?",
            answer: "Yes, contact us at least 24 hours before your scheduled time to change your booking."
        },
        {
            question: "Do you accept walk-ins?",
            answer: "Yes, but priority is given to booked clients. We recommend reserving online."
        },
        {
            question: "What payment methods do you accept?",
            answer: "Cash, debit card, and mobile banking are accepted at the shop."
        },
        {
            question: "How long does a classic haircut take?",
            answer: "Typically 45 minutes, including consultation and styling."
        }
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

        const items = document.querySelectorAll(".faq-item");
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
        <div className="help-page">
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="help-main">
                <section className="help-section">
                    <div className="help-header">
                        <h2 className="help-title">Need Help?</h2>
                        <div className="underline"></div>
                        <p className="help-subtitle">
                            Everything you need to know about booking, services, and policies
                        </p>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className={`faq-item fade-in-up delay-${idx + 1}`}>
                                <div className="faq-question">
                                    <i className="fas fa-question-circle"></i> {faq.question}
                                </div>
                                <div className="faq-answer">
                                    {faq.answer}
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

export default HelpPage;