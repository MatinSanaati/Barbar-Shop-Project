import React, { useState, useEffect } from 'react';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import './Taking-Turns.css';
import CalendarModal from '../../components/Calendar-Modal/Calendar-Modal';

const TakingturnsPage = () => {
    // 🔹 State فرم نوبت
    const [service, setService] = useState('');
    const [time, setTime] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState('');

    // تابع انتخاب تاریخ
    const handleSelectDate = (dateStr) => {
        setDate(dateStr);
    };

    // 🔹 State مدیریت تم
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

    // 🔹 بارگذاری تم از localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // 🔹 تغییر تم
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // 🔹 زمان‌های آزاد و رزروشده
    const availableTimes = ['۱۰:۰۰', '۱۱:۰۰', '۱۳:۰۰', '۱۴:۰۰', '۱۵:۰۰', '۱۶:۰۰', '۱۷:۰۰'];
    const bookedTimes = ['۱۴:۰۰'];

    // 🔹 ارسال فرم
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!service || !date || !time) {
            alert('لطفاً تمام فیلدها را قبل از ثبت پر کنید!');
            return;
        }
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="booking-page" dir="rtl">
            {/* 🔝 هدر با دکمه تغییر تم */}
            <Header theme={theme} toggleTheme={toggleTheme} />

            {/* 🧱 بخش اصلی فرم رزرو نوبت */}
            <main className="booking-main">
                <section className="booking-section">
                    <div className="booking-container">
                        <h2 className="booking-title">رزرو نوبت آنلاین</h2>
                        <div className="underline"></div>
                        <form className="booking-form" onSubmit={handleSubmit}>
                            {/* انتخاب خدمت */}
                            <div className="form-group fade-in-up delay-1">
                                <label htmlFor="service">انتخاب خدمت</label>
                                <select
                                    id="service"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                >
                                    <option value="">-- لطفاً خدمت مورد نظر را انتخاب کنید --</option>
                                    <option value="اصلاح کلاسیک">اصلاح کلاسیک</option>
                                    <option value="اصلاح و مرتب‌سازی ریش">اصلاح و مرتب‌سازی ریش</option>
                                    <option value="پکیج مو و ریش">پکیج مو و ریش</option>
                                    <option value="شستشو و حالت‌دهی">شستشو و حالت‌دهی</option>
                                </select>
                            </div>

                            {/* انتخاب تاریخ */}
                            <div className="form-group fade-in-up delay-2">
                                <label>انتخاب تاریخ</label>
                                <button
                                    type="button"
                                    className="calendar-button"
                                    onClick={() => setShowCalendar(true)}
                                >
                                    {date ? date : "تاریخ را انتخاب کنید"}
                                    <i className="fas fa-calendar-alt"></i>
                                </button>
                            </div>

                            {/* انتخاب زمان */}
                            <div className="form-group fade-in-up delay-3">
                                <label>انتخاب زمان</label>
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

                            {/* دکمه ارسال */}
                            <div className="form-group fade-in-up delay-4">
                                <button type="submit" className="btn-submit">
                                    <i className="fas fa-calendar-alt"></i> ثبت نوبت
                                </button>
                            </div>

                            {submitted && (
                                <div className="success-message">
                                    نوبت شما با موفقیت ثبت شد!
                                </div>
                            )}
                        </form>
                    </div>
                </section>
            </main>

            {/* 🔝 فوتر */}
            <Footer />
            {showCalendar && <div className="page-overlay"></div>}
            {showCalendar && (
                <CalendarModal
                    onSelectDate={handleSelectDate}
                    onClose={() => setShowCalendar(false)}
                />
            )}
        </div>
    );
};

export default TakingturnsPage;