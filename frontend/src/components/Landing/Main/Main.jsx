import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Main = ({
    bookingForm,
    contactForm,
    handleBookingFormChange,
    handleContactFormChange
}) => {
    const [animatedElements, setAnimatedElements] = useState([]);
    const [services, setServices] = useState([]);
    const [siteInfo, setSiteInfo] = useState({
        hero: { title: "", description: "", image: "" },
        about: { title: "", paragraphs: [], image: "" }
    });

    // Intersection Observer
    useEffect(() => {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
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

    // 🔹 دریافت داده‌ها از سرور
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, infoRes] = await Promise.all([
                    fetch('http://localhost:5000/api/services').then(r => r.json()),
                    fetch('http://localhost:5000/api/site-info').then(r => r.json())
                ]);
                setServices(servicesRes);
                setSiteInfo(infoRes);
            } catch (err) {
                console.error('❌ خطای بارگذاری داده:', err);
            }
        };
        fetchData();
    }, []);

    // اطلاعات تماس
    const contactInfo = [
        { icon: "fas fa-map-marker-alt", label: "آدرس", value: "تهران، خیابان ولیعصر، پلاک 1234" },
        { icon: "fas fa-phone", label: "تلفن", value: "021-12345678" },
        { icon: "fas fa-mobile-alt", label: "موبایل", value: "0912 345 6789" },
        { icon: "fas fa-envelope", label: "ایمیل", value: "info@barbershop.ir" },
        { icon: "fas fa-clock", label: "ساعات کاری", value: "شنبه تا چهارشنبه: 9 تا 21<br />پنجشنبه: 9 تا 18" }
    ];

    return (
        <main className="main-content">
            {/* Hero Section */}
            <section className="hero-section" data-animation-id="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className={`hero-text ${isAnimated('hero') ? 'animate-fade-in-up' : ''}`}>
                            <h1 className="hero-title">{siteInfo.hero.title}</h1>
                            <p className="hero-description">{siteInfo.hero.description}</p>
                            <div className="hero-buttons">
                                <Link to="/taking-turns" className="btn btn-primary">
                                    <i className="fas fa-calendar-alt"></i> رزرو نوبت
                                </Link>
                                <Link to="/services" className="btn btn-secondary">
                                    <i className="fas fa-concierge-bell"></i> مشاهده خدمات
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-overlay"></div>
                <div
                    className="hero-decoration"
                    style={{ backgroundImage: `url(${siteInfo.hero.image})` }}
                ></div>
            </section>

            {/* Services Section */}
            <section className="section services-section" data-animation-id="services">
                <div className="section-container">
                    <div className={`section-header ${isAnimated('services') ? 'animate-fade-in' : ''}`}>
                        <h2 className="section-title">خدمات ما</h2>
                        <p className="section-subtitle">مجموعه‌ای از خدمات تخصصی و حرفه‌ای در زمینه آرایش مردانه</p>
                    </div>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`service-card animate-fade-in-up delay-${index + 1}`}
                                data-animation-id={`service-${service.id}`}
                            >
                                <div className="service-image">
                                    <img src={service.image || '/images/services/default.jpg'} alt={service.title} loading="lazy" />
                                    {service.badge && <div className={`service-badge ${service.badgeClass}`}>{service.badge}</div>}
                                </div>
                                <div className="service-content">
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                    <div className="service-meta">
                                        <div className="service-price">از {service.price.toLocaleString()} تومان</div>
                                        <div className="service-time"><i className="far fa-clock"></i> {service.duration} دقیقه</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* بقیه بخش‌ها (Booking, About, Contact) بدون تغییر */}
            {/* فقط در About Section، عکس و متن از siteInfo میاد */}
            <section className="section about-section" data-animation-id="about">
                <div className="section-container">
                    <div className="about-content">
                        <div className="about-text animate-fade-in-up delay-1" data-animation-id="about-text">
                            <div className="section-header">
                                <h2 className="section-title">{siteInfo.about.title}</h2>
                            </div>
                            {siteInfo.about.paragraphs.map((p, i) => (
                                <p key={i} className="about-paragraph">{p}</p>
                            ))}
                        </div>
                        <div className="about-image animate-fade-in-up delay-2" data-animation-id="about-image">
                            <img src={siteInfo.about.image} alt="درباره ما" loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section contact-section" data-animation-id="contact">
                <div className="section-container">
                    <div className="contact-content">
                        <div className="contact-info animate-fade-in-up delay-1" data-animation-id="contact-info">
                            <div className="section-header">
                                <h2 className="section-title">اطلاعات تماس</h2>
                            </div>
                            <ul className="contact-details">
                                {contactInfo.map((info, index) => (
                                    <li key={index} className="contact-item">
                                        <div className="contact-icon-wrapper">
                                            <i className={`fas ${info.icon} contact-icon`}></i>
                                        </div>
                                        <div className="contact-text">
                                            <h3 className="contact-label">{info.label}</h3>
                                            <p className="contact-value" dangerouslySetInnerHTML={{ __html: info.value }}></p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="social-links">
                                <a href="#" aria-label="اینستاگرام" className="social-link"><i className="fab fa-instagram"></i></a>
                                <a href="#" aria-label="تلگرام" className="social-link"><i className="fab fa-telegram"></i></a>
                                <a href="#" aria-label="واتساپ" className="social-link"><i className="fab fa-whatsapp"></i></a>
                                <a href="#" aria-label="فیسبوک" className="social-link"><i className="fab fa-facebook-f"></i></a>
                            </div>
                        </div>
                        <div className="contact-form animate-fade-in-up delay-2" data-animation-id="contact-form">
                            {/* فرم تماس بدون تغییر */}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Main;