// src/pages/TakingturnsPage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../../User/Header/Header';
import Footer from '../../../User/Footer/Footer';
import './Taking-Turms.css';

const TakingturnsPage = () => {
    // 🔹 State برای فرم نوبت
    const [service, setService] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [submitted, setSubmitted] = useState(false);

    // 🔹 State برای مدیریت تم
    const [theme, setTheme] = useState('dark');

    // 🔹 Intersection Observer برای انیمیشن ورود
    useEffect(() => {
        const section = document.querySelector('.booking-section');
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

    // 🔹 زمان‌های موجود و رزروشده
    const availableTimes = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    const bookedTimes = ['14:00']; // مثال: ساعت 14:00 قبلاً رزرو شده

    // 🔹 ارسال فرم
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!service || !date || !time) {
            alert('Please fill all fields before submitting!');
            return;
        }
        setSubmitted(true);
        // Reset form after submission
        setService('');
        setDate('');
        setTime('');
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="booking-page">
            {/* 🔝 هدر با تم فعلی و دکمه تغییر تم */}
            <Header theme={theme} toggleTheme={toggleTheme} />

            {/* 🧱 محتوای اصلی فرم نوبت‌دهی */}
            <main className="booking-main">
                <section className="booking-section">
                    <div className="booking-container">
                        <h2 className="booking-title">Book Your Appointment</h2>
                        <div className="underline"></div>
                        <form className="booking-form" onSubmit={handleSubmit}>
                            {/* Service Selection */}
                            <div className="form-group fade-in-up delay-1">
                                <label htmlFor="service">Select Service</label>
                                <select
                                    id="service"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                >
                                    <option value="">-- Choose a Service --</option>
                                    <option value="Classic Haircut">Classic Haircut</option>
                                    <option value="Beard Grooming">Beard Grooming</option>
                                    <option value="Hair & Beard Combo">Hair & Beard Combo</option>
                                    <option value="Shampoo & Style">Shampoo & Style</option>
                                </select>
                            </div>

                            {/* Date Selection */}
                            <div className="form-group fade-in-up delay-2">
                                <label htmlFor="date">Choose Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    max={
                                        new Date(new Date().setDate(new Date().getDate() + 30))
                                            .toISOString()
                                            .split('T')[0]
                                    }
                                />
                            </div>

                            {/* Time Selection */}
                            <div className="form-group fade-in-up delay-3">
                                <label>Choose Time</label>
                                <div className="time-grid">
                                    {availableTimes.map((t) => {
                                        const disabled = bookedTimes.includes(t);
                                        return (
                                            <button
                                                type="button"
                                                key={t}
                                                className={`time-slot ${time === t ? 'selected' : ''}`}
                                                disabled={disabled}
                                                onClick={() => setTime(t)}
                                            >
                                                {t}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="form-group fade-in-up delay-4">
                                <button type="submit" className="btn-submit">
                                    <i className="fas fa-calendar-alt"></i> Reserve My Spot
                                </button>
                            </div>

                            {submitted && (
                                <div className="success-message">
                                    Your appointment has been booked!
                                </div>
                            )}
                        </form>
                    </div>
                </section>
            </main>

            {/* 🔝 فوتر ثابت پایین صفحه */}
            <Footer />
        </div>
    );
};

export default TakingturnsPage;