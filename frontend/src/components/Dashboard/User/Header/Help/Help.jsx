// src/pages/HelpPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../../User/Header/Header';
import Footer from '../../../User/Footer/Footer';
import './Help.css';

const HelpPage = () => {
    // 🔹 State برای مدیریت تم
    const [theme, setTheme] = useState('dark');

    // 🔹 داده‌های سوالات متداول (فارسی شده)
    const faqs = [
        {
            question: "چطور می‌توانم نوبت رزرو کنم؟",
            answer: "به صفحه «رزرو نوبت» بروید، سرویس، تاریخ و ساعت خود را انتخاب کنید و اطلاعاتتان را تأیید نمایید."
        },
        {
            question: "اگر دیر به نوبت برسم چه می‌شود؟",
            answer: "لطفاً به موقع مراجعه کنید. در صورتی که بیش از ۱۰ دقیقه تأخیر داشته باشید، ممکن است نوبت شما لغو شود."
        },
        {
            question: "آیا می‌توانم نوبت خود را تغییر بدهم؟",
            answer: "بله، کافیست حداقل ۲۴ ساعت قبل از زمان رزرو شده با ما تماس بگیرید تا تغییر اعمال شود."
        },
        {
            question: "آیا مراجعه حضوری بدون رزرو امکان‌پذیر است؟",
            answer: "بله، اما اولویت با افرادی است که از قبل نوبت گرفته‌اند. پیشنهاد می‌کنیم آنلاین رزرو کنید."
        },
        {
            question: "چه روش‌های پرداختی دارید؟",
            answer: "پرداخت نقدی، کارت بانکی و درگاه‌های موبایلی در آرایشگاه پذیرفته می‌شود."
        },
        {
            question: "یک اصلاح کلاسیک چقدر زمان می‌برد؟",
            answer: "به طور معمول حدود ۴۵ دقیقه طول می‌کشد که شامل مشاوره و استایل نهایی است."
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
        <div className="help-page" dir="rtl">
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="help-main">
                <section className="help-section">
                    <div className="help-header">
                        <h2 className="help-title">سؤالات متداول</h2>
                        <div className="underline"></div>
                        <p className="help-subtitle">
                            همه چیز درباره رزرو نوبت، خدمات و قوانین آرایشگاه
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