import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import './Help.css';

const HelpPage = () => {
    // States
    const [theme, setTheme] = useState('dark');

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

    const steps = [
        {
            id: 1,
            title: "ورود به سایت",
            description: "ابتدا به صفحه اصلی سایت مراجعه کنید. در نوار بالای صفحه، گزینه \"نوبت‌دهی\" را انتخاب کنید یا دکمه \"رزرو نوبت آنلاین\" را بزنید.",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "صفحه اصلی سایت"
        },
        {
            id: 2,
            title: "ورود به حساب کاربری",
            description: "در صفحه نوبت‌دهی، برای استفاده از خدمات، باید وارد حساب کاربری خود شوید. اگر قبلاً ثبت‌نام کرده‌اید، اطلاعات ورود خود را وارد کنید. در غیر اینصورت، گزینه \"ثبت‌نام\" را انتخاب کنید.",
            image: "https://images.unsplash.com/photo-1599351431408-269d027d3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "ورود به حساب کاربری"
        },
        {
            id: 3,
            title: "انتقال به پنل کاربری",
            description: "پس از ورود موفقیت‌آمیز، به صورت خودکار به پنل کاربری خودتان منتقل می‌شوید. در این پنل می‌توانید نوبت‌های خود را مدیریت کنید.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "پنل کاربری"
        },
        {
            id: 4,
            title: "انتخاب خدمات",
            description: "در پنل کاربری، بر روی گزینه \"رزرو نوبت جدید\" کلیک کنید. سپس خدمات مورد نظر خود را از لیست خدمات ارائه شده انتخاب کنید.",
            image: "https://images.unsplash.com/photo-1596466596120-2a8e4b5d2c4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "انتخاب خدمات"
        },
        {
            id: 5,
            title: "تعیین تاریخ و ساعت",
            description: "تاریخ مراجعه خود را از تقویم انتخاب کنید و سپس ساعت مراجعه مطلوب خود را از لیست ساعات موجود انتخاب نمایید.",
            image: "https://images.unsplash.com/photo-1599351431202-1e0f01871d9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "تاریخ و ساعت"
        },
        {
            id: 6,
            title: "ثبت نوبت",
            description: "پس از انتخاب تمامی گزینه‌ها، بر روی دکمه \"ثبت نوبت\" کلیک کنید. نوبت شما با موفقیت ثبت خواهد شد و پیامکی برای شما ارسال می‌شود.",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            alt: "ثبت نوبت"
        }
    ];

    const tips = [
        {
            id: 1,
            icon: "fas fa-user-lock",
            title: "احراز هویت",
            description: "برای استفاده از سیستم نوبت‌دهی، ورود به حساب کاربری الزامی است. این کار امنیت اطلاعات شما را تضمین می‌کند."
        },
        {
            id: 2,
            icon: "fas fa-history",
            title: "تاریخچه نوبت‌ها",
            description: "در پنل کاربری می‌توانید تاریخچه کامل نوبت‌های خود را مشاهده کنید و نوبت‌های قبلی را مرور نمایید."
        },
        {
            id: 3,
            icon: "fas fa-bell",
            title: "یادآوری نوبت",
            description: "یک پیامک یادآوری ۱ ساعت قبل از نوبت شما ارسال خواهد شد. در صورت عدم دریافت، با ما تماس بگیرید."
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
        <div className="help-page">
            {/* Header */}
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="help-main">
                {/* Hero Section */}
                <section className="hero" data-animation-id="hero">
                    <div className="hero-content">
                        <div className={`hero-text ${isAnimated('hero') ? 'animate-fade-in-up' : ''}`}>
                            <h1 className="hero-title">راهنمای استفاده از سیستم</h1>
                            <p className="hero-description">
                                آموزش گام به گام استفاده از سیستم نوبت‌دهی آنلاین آرایشگاه BARBER SHOP
                            </p>
                            <a href="#guide" className="btn btn-primary">
                                <i className="fas fa-arrow-down"></i> مشاهده راهنما
                            </a>
                        </div>
                    </div>
                </section>

                {/* Guide Section */}
                <section id="guide" className="section guide-section" data-animation-id="guide">
                    <div className="container">
                        <div className={`section-header ${isAnimated('guide') ? 'animate-fade-in-up' : ''}`}>
                            <h2 className="section-title">راهنمای استفاده از سیستم</h2>
                            <p className="section-subtitle">
                                با سیستم نوبت‌دهی آنلاین ما آشنا شوید و از خدمات آن به راحتی استفاده کنید
                            </p>
                        </div>
                        <div className="steps-container">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={`step-card animate-fade-in-up delay-${index + 1}`}
                                    data-animation-id={`step-${step.id}`}
                                >
                                    <div className="step-number">{step.id}</div>
                                    <div className="step-content">
                                        <h3 className="step-title">{step.title}</h3>
                                        <p className="step-description">{step.description}</p>
                                        <div className="step-image">
                                            <img src={step.image} alt={step.alt} loading="lazy" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tips Section */}
                <section className="section tips-section" data-animation-id="tips">
                    <div className="container">
                        <div className={`section-header ${isAnimated('tips') ? 'animate-fade-in-up' : ''}`}>
                            <h2 className="section-title">نکات مهم</h2>
                            <p className="section-subtitle">
                                نکاتی که برای استفاده بهتر از سیستم باید بدانید
                            </p>
                        </div>
                        <div className="tips-grid">
                            {tips.map((tip, index) => (
                                <div
                                    key={tip.id}
                                    className={`tip-card animate-fade-in-up delay-${index + 1}`}
                                    data-animation-id={`tip-${tip.id}`}
                                >
                                    <div className="tip-icon">
                                        <i className={tip.icon}></i>
                                    </div>
                                    <h3 className="tip-title">{tip.title}</h3>
                                    <p className="tip-description">{tip.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section cta-section" data-animation-id="cta">
                    <div className="container">
                        <div className={`cta-content ${isAnimated('cta') ? 'animate-fade-in-up' : ''}`}>
                            <h2 className="cta-title">آماده برای رزرو نوبت؟</h2>
                            <p className="cta-description">
                                اکنون که با سیستم آشنا شدید، می‌توانید نوبت خود را به سادگی رزرو کنید
                            </p>
                            <Link to="/TakingturnsPage" className="btn btn-secondary">
                                <i className="fas fa-calendar-alt"></i> رزرو نوبت آنلاین
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HelpPage;