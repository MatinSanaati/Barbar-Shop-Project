import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import './Taking-Turms.css';

const TakingturnsPage = () => {
    // States
    const [theme, setTheme] = useState('dark');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        master: '',
        date: '',
        time: '',
        notes: ''
    });

    const [animatedElements, setAnimatedElements] = useState([]);

    // Intersection Observer برای انیمیشن اسکرول
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setAnimatedElements(prev => [...prev, entry.target.dataset.animationId]);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const elements = document.querySelectorAll('[data-animation-id]');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const isAnimated = (id) => animatedElements.includes(id);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert('نوبت شما با موفقیت ثبت شد! کد رهگیری: BS-2023-001\nبه زودی با شما تماس خواهیم گرفت.');
        setFormData({
            name: '',
            phone: '',
            service: '',
            master: '',
            date: '',
            time: '',
            notes: ''
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const steps = [
        {
            id: 1,
            number: "1",
            title: "انتخاب خدمات",
            description: "خدمات مورد نظر خود را انتخاب کنید و استایلیست مورد نظرتان را مشخص نمایید."
        },
        {
            id: 2,
            number: "2",
            title: "تعیین زمان",
            description: "تاریخ و ساعت مراجعه خود را انتخاب کنید و نوبت خود را رزرو نمایید."
        },
        {
            id: 3,
            number: "3",
            title: "دریافت تأییدیه",
            description: "کد رهگیری نوبت خود را دریافت کنید و منتظر مراجعه در زمان تعیین شده باشید."
        }
    ];

    const benefits = [
        {
            id: 1,
            icon: "fas fa-clock",
            title: "صرفه‌جویی در زمان",
            description: "دیگر نیازی به صف ایستادن نیست. نوبت خود را هر زمان و مکان رزرو کنید."
        },
        {
            id: 2,
            icon: "fas fa-tag",
            title: "تخفیف‌های ویژه",
            description: "مشتریان نوبت‌دهی آنلاین از تخفیف‌های ویژه و خدمات رایگان بهره‌مند می‌شوند."
        },
        {
            id: 3,
            icon: "fas fa-user-check",
            title: "انتخاب استایلیست",
            description: "استایلیست مورد نظر خود را انتخاب کنید و از خدمات تخصصی او لذت ببرید."
        },
        {
            id: 4,
            icon: "fas fa-bell",
            title: "یادآوری نوبت",
            description: "پیامک یادآوری نوبت دریافت کنید و هیچ نوبتی را از دست ندهید."
        }
    ];

    // بارگذاری تم از localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme' || 'dark');
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
        <div className="taking-turns-page">
            {/* Header */}
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="taking-turns-main">
                {/* Hero Section */}
                <section className="hero" data-animation-id="hero">
                    <div className="hero-content">
                        <div className={`hero-text ${isAnimated('hero') ? 'animate-fade-in-up' : ''}`}>
                            <h1 className="hero-title">نوبت‌دهی آنلاین</h1>
                            <p className="hero-description">
                                نوبت خود را به سادگی و سریع رزرو کنید و از خدمات تخصصی استایلیست‌های برتر لذت ببرید.
                            </p>
                            <div className="hero-buttons">
                                <Link to="#booking" className="btn btn-primary">
                                    <i className="fas fa-calendar-alt"></i> رزرو نوبت
                                </Link>
                                <Link to="/ServicesPage" className="btn btn-secondary">
                                    <i className="fas fa-concierge-bell"></i> مشاهده خدمات
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Booking Section */}
                <section id="booking" className="section booking-section" data-animation-id="booking">
                    <div className="container">
                        <div className={`section-header ${isAnimated('booking') ? 'animate-fade-in-up' : ''}`}>
                            <h2 className="section-title">رزرو نوبت آنلاین</h2>
                            <p className="section-subtitle">
                                نوبت خود را به سادگی و سریع رزرو کنید و از تخفیف ویژه امروز بهره‌مند شوید
                            </p>
                        </div>
                        <div className="booking-content">
                            <div className={`booking-form animate-fade-in-up delay-1`} data-animation-id="booking-form">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">نام و نام خانوادگی</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="form-control"
                                                placeholder="نام کامل خود را وارد کنید"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone" className="form-label">شماره تماس</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                className="form-control"
                                                placeholder="0912 345 6789"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="service" className="form-label">خدمات مورد نظر</label>
                                            <select
                                                id="service"
                                                className="form-control"
                                                value={formData.service}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">انتخاب خدمات</option>
                                                <option value="haircut">برش مو</option>
                                                <option value="beard">ریش تراشی</option>
                                                <option value="color">رنگ مو</option>
                                                <option value="combo">کمبو برش و ریش</option>
                                                <option value="shave">اصلاح کامل</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="master" className="form-label">انتخاب استایلیست</label>
                                            <select
                                                id="master"
                                                className="form-control"
                                                value={formData.master}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">انتخاب استایلیست</option>
                                                <option value="master1">استایلیست ارشد</option>
                                                <option value="master2">استایلیست حرفه‌ای</option>
                                                <option value="master3">استایلیست تازه‌کار</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="date" className="form-label">تاریخ مراجعه</label>
                                            <input
                                                type="date"
                                                id="date"
                                                className="form-control"
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="time" className="form-label">ساعت مراجعه</label>
                                            <select
                                                id="time"
                                                className="form-control"
                                                value={formData.time}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">انتخاب ساعت</option>
                                                <option value="9">9:00</option>
                                                <option value="10">10:00</option>
                                                <option value="11">11:00</option>
                                                <option value="12">12:00</option>
                                                <option value="14">14:00</option>
                                                <option value="15">15:00</option>
                                                <option value="16">16:00</option>
                                                <option value="17">17:00</option>
                                                <option value="18">18:00</option>
                                                <option value="19">19:00</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="notes" className="form-label">توضیحات (اختیاری)</label>
                                        <textarea
                                            id="notes"
                                            className="form-control"
                                            placeholder="هر توضیحی که در مورد خدمات مورد نظر دارید..."
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="submit-btn">
                                        ثبت نوبت و دریافت کد رهگیری
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Steps Section */}
                <section className="section steps-section" data-animation-id="steps">
                    <div className="container">
                        <div className={`section-header text-center ${isAnimated('steps') ? 'animate-fade-in-up' : ''}`}>
                            <h2 className="section-title">مراحل رزرو نوبت</h2>
                            <p className="section-subtitle">سه مرحله ساده برای رزرو نوبت آنلاین</p>
                        </div>
                        <div className="steps-grid">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={`step-card animate-fade-in-up delay-${index + 1}`}
                                    data-animation-id={`step-${step.id}`}
                                >
                                    <div className="step-number">{step.number}</div>
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-description">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="section benefits-section" data-animation-id="benefits">
                    <div className="container">
                        <div className={`section-header text-center ${isAnimated('benefits') ? 'animate-fade-in-up' : ''}`}>
                            <h2 className="section-title">مزایای نوبت‌دهی آنلاین</h2>
                            <p className="section-subtitle">چرا باید از سیستم نوبت‌دهی آنلاین ما استفاده کنید؟</p>
                        </div>
                        <div className="benefits-grid">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={benefit.id}
                                    className={`benefit-card animate-fade-in-up delay-${index + 1}`}
                                    data-animation-id={`benefit-${benefit.id}`}
                                >
                                    <div className="benefit-icon">
                                        <i className={benefit.icon}></i>
                                    </div>
                                    <div className="benefit-content">
                                        <h3 className="benefit-title">{benefit.title}</h3>
                                        <p className="benefit-description">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default TakingturnsPage;