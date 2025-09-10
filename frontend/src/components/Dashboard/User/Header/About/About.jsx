import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../User/Header/Header';
import Footer from '../../../User/Footer/Footer';
import './About.css';

const UserAboutPage = () => {
    // States
    const [theme, setTheme] = useState('dark');

    const [bookingForm, setBookingForm] = useState({
        name: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        notes: ''
    });

    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [animatedElements, setAnimatedElements] = useState([]);

    // Intersection Observer برای انیمیشن‌های اسکرول
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

    const teamMembers = [
        {
            id: 1,
            name: "علی رضایی",
            position: "استایلیست ارشد",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            name: "محمد احمدی",
            position: "استایلیست حرفه‌ای",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            name: "حسین کریمی",
            position: "استایلیست تازه‌کار",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            name: "رضا محمدی",
            position: "استایلیست جوان",
            image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    const stats = [
        { value: "8", label: "سال تجربه" },
        { value: "12000+", label: "مشتری راضی" },
        { value: "98%", label: "رضایت مشتریان" },
        { value: "15", label: "استایلیست حرفه‌ای" }
    ];

    // بارگذاری تم از localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme' || 'dark');
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // تاغیر تم
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="about-page">
            {/* Header */}
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="about-main">
                {/* Hero Section */}
                <section className="hero" data-animation-id="hero">
                    <div className="hero-content">
                        <div className={`hero-text ${isAnimated('hero') ? 'animate-fade-in-up' : ''}`}>
                            <h1 className="hero-title">تجربه آرایش مردانه در سطح حرفه‌ای</h1>
                            <p className="hero-description">
                                با سیستم نوبت‌دهی آنلاین ما، هر زمان و مکان نوبت خود را رزرو کنید و از خدمات تخصصی استایلیست‌های برتر لذت ببرید.
                            </p>
                            <div className="hero-buttons">
                                <Link to="/TakingturnsPage" className="btn btn-primary">
                                    <i className="fas fa-calendar-alt"></i> رزرو نوبت
                                </Link>
                                <Link to="/ServicesPage" className="btn btn-secondary">
                                    <i className="fas fa-concierge-bell"></i> مشاهده خدمات
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="section about-section" data-animation-id="about">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">درباره آرایشگاه BARBER SHOP</h2>
                            <p className="section-subtitle">
                                آرایشگاهی با تاریخچه‌ای غنی و تیمی از استایلیست‌های حرفه‌ای که همواره در تلاشند تا بهترین خدمات را به مشتریان عزیز ارائه دهند.
                            </p>
                        </div>
                        <div className="about-content">
                            <div className={`about-text animate-fade-in-up delay-1`} data-animation-id="about-text">
                                <h3 className="about-subtitle">آغاز راه</h3>
                                <p className="about-paragraph">
                                    آرایشگاه BARBER SHOP در سال 1395 با هدف ارائه خدمات آرایشی مردانه در سطحی حرفه‌ای و با کیفیت بالا تأسیس شد. بنیان‌گذاران آرایشگاه با سال‌ها تجربه در زمینه آرایش مردانه، تصمیم گرفتند تا فضایی آرام و دوستانه را برای مشتریان فراهم کنند.
                                </p>
                                <p className="about-paragraph">
                                    از ابتدا، تمرکز ما بر کیفیت خدمات، استفاده از بهترین تجهیزات و محصولات موجود در بازار و ارائه تجربه‌ای منحصر به فرد برای هر مشتری بوده است.
                                </p>

                                <h3 className="about-subtitle" style={{ marginTop: '2rem' }}>رشد و توسعه</h3>
                                <p className="about-paragraph">
                                    در طول این سال‌ها، آرایشگاه ما توانسته است جایگاه مناسبی در میان مشتریان خود پیدا کند و با به‌کارگیری استایلیست‌های مجرب و با تجربه، همواره در تلاش برای ارائه خدمات بهتر بوده است.
                                </p>
                                <p className="about-paragraph">
                                    امروزه، BARBER SHOP با داشتن تیمی از استایلیست‌های حرفه‌ای و استفاده از جدیدترین تکنیک‌ها و تجهیزات، یکی از محبوب‌ترین آرایشگاه‌های مردانه در منطقه تبدیل شده است.
                                </p>
                            </div>
                            <div className={`about-image animate-fade-in-up delay-2`} data-animation-id="about-image">
                                <img
                                    src="https://images.unsplash.com/photo-1599351431202-1e0f01871d9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="درباره ما"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="section mission-section" data-animation-id="mission">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-title">ماموریت و چشم‌انداز</h2>
                            <p className="section-subtitle">ارزش‌ها و اهداف ما در آرایشگاه BARBER SHOP</p>
                        </div>
                        <div className="mission-grid">
                            <div className={`mission-card animate-fade-in-up delay-1`} data-animation-id="mission-1">
                                <div className="mission-icon">
                                    <i className="fas fa-bullseye"></i>
                                </div>
                                <h3 className="mission-title">ماموریت ما</h3>
                                <p className="mission-description">
                                    ارائه خدمات آرایشی مردانه در سطحی حرفه‌ای و با کیفیت بالا با استفاده از جدیدترین تکنیک‌ها و بهترین محصولات موجود در بازار.
                                </p>
                            </div>
                            <div className={`mission-card animate-fade-in-up delay-2`} data-animation-id="mission-2">
                                <div className="mission-icon">
                                    <i className="fas fa-eye"></i>
                                </div>
                                <h3 className="mission-title">چشم‌انداز</h3>
                                <p className="mission-description">
                                    تبدیل شدن به یکی از مطرح‌ترین آرایشگاه‌های مردانه در کشور و الگویی برای سایر آرایشگاه‌ها در زمینه کیفیت خدمات و رضایت مشتریان.
                                </p>
                            </div>
                            <div className={`mission-card animate-fade-in-up delay-3`} data-animation-id="mission-3">
                                <div className="mission-icon">
                                    <i className="fas fa-handshake"></i>
                                </div>
                                <h3 className="mission-title">تعهدات ما</h3>
                                <p className="mission-description">
                                    رعایت کامل بهداشت، احترام به زمان مشتریان، ارائه خدمات شخصی‌سازی شده و ایجاد محیطی آرام و دوستانه برای همه مراجعان.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="section team-section" data-animation-id="team">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-title">تیم حرفه‌ای ما</h2>
                            <p className="section-subtitle">استایلیست‌های مجرب و با تجربه آرایشگاه BARBER SHOP</p>
                        </div>
                        <div className="team-grid">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={member.id}
                                    className={`team-member animate-fade-in-up delay-${index + 1}`}
                                    data-animation-id={`team-${member.id}`}
                                >
                                    <div className="member-image">
                                        <img src={member.image} alt={member.name} loading="lazy" />
                                    </div>
                                    <div className="member-content">
                                        <h3 className="member-name">{member.name}</h3>
                                        <p className="member-position">{member.position}</p>
                                        <div className="social-links">
                                            <a href="#" aria-label="اینستاگرام"><i className="fab fa-instagram"></i></a>
                                            <a href="#" aria-label="تلگرام"><i className="fab fa-telegram"></i></a>
                                            <a href="#" aria-label="واتساپ"><i className="fab fa-whatsapp"></i></a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="section stats-section" data-animation-id="stats">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-title">آمار ما</h2>
                            <p className="section-subtitle">دستاوردهای ما در طول این سال‌ها</p>
                        </div>
                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`stat-card animate-fade-in-up delay-${index + 1}`}
                                    data-animation-id={`stat-${index}`}
                                >
                                    <div className="stat-value">{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section cta-section" data-animation-id="cta">
                    <div className="container">
                        <div className={`cta-content text-center animate-fade-in-up delay-1`} data-animation-id="cta-content">
                            <h2 className="cta-title">آماده برای تجربه آرایش حرفه‌ای؟</h2>
                            <p className="cta-description">
                                نوبت خود را همین امروز رزرو کنید و از تخفیف ویژه امروز بهره‌مند شوید
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

export default UserAboutPage;