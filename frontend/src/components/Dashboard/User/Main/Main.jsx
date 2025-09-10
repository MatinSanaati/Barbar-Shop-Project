import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

const Main = ({
    bookingForm,
    contactForm,
    handleBookingFormChange,
    handleContactFormChange
}) => {
    // State برای انیمیشن‌های اسکرول
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

        // المنت‌هایی که باید انیمیت بشن
        const elements = document.querySelectorAll('[data-animation-id]');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // تابع بررسی انیمیشن
    const isAnimated = (id) => animatedElements.includes(id);

    // داده‌های سرویس‌ها
    const services = [
        {
            id: 1,
            title: "آرایش مو",
            description: "برش، رنگ، فر و صاف کردن مو با جدیدترین تکنیک‌ها و محصولات با کیفیت",
            price: "از 150,000 تومان",
            time: "45 دقیقه",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "پرفروش",
            badgeClass: "popular"
        },
        {
            id: 2,
            title: "آرایش صورت",
            description: "آرایش حرفه‌ای برای مراسم، مهمانی و هر موقعیت خاص با استایل شخصی شما",
            price: "از 120,000 تومان",
            time: "30 دقیقه",
            image: "https://images.unsplash.com/photo-1599351431408-269d027d3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "جدید",
            badgeClass: "new"
        },
        {
            id: 3,
            title: "ناخن زنی",
            description: "طراحی ناخن، لاک‌کاری، ژل و اکریلیک با طرح‌های متنوع و مدرن",
            price: "از 80,000 تومان",
            time: "60 دقیقه",
            image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "پرفروش",
            badgeClass: "popular"
        }
    ];

    // اطلاعات تماس
    const contactInfo = [
        {
            icon: "fas fa-map-marker-alt",
            label: "آدرس",
            value: "تهران، خیابان ولیعصر، پلاک 1234"
        },
        {
            icon: "fas fa-phone",
            label: "تلفن",
            value: "021-12345678"
        },
        {
            icon: "fas fa-mobile-alt",
            label: "موبایل",
            value: "0912 345 6789"
        },
        {
            icon: "fas fa-envelope",
            label: "ایمیل",
            value: "info@barbershop.ir"
        },
        {
            icon: "fas fa-clock",
            label: "ساعات کاری",
            value: "شنبه تا چهارشنبه: 9 تا 21<br />پنجشنبه: 9 تا 18"
        }
    ];

    return (
        <main className="main-content">
            {/* Hero Section - حرفه‌ای و بهینه */}
            <section className="hero-section" data-animation-id="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className={`hero-text ${isAnimated('hero') ? 'animate-fade-in-up' : ''}`}>
                            <h1 className="hero-title">تجربه آرایش مردانه در سطح حرفه‌ای</h1>
                            <p className="hero-description">با سیستم نوبت‌دهی آنلاین ما، هر زمان و مکان نوبت خود را رزرو کنید و از خدمات تخصصی استایلیست‌های برتر لذت ببرید.</p>
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
                </div>
                <div className="hero-overlay"></div>
                <div className="hero-decoration"></div>
            </section>

            {/* Services Section - بهینه شده */}
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
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        loading="lazy"
                                    />
                                    <div className={`service-badge ${service.badgeClass}`}>
                                        {service.badge}
                                    </div>
                                </div>
                                <div className="service-content">
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                    <div className="service-meta">
                                        <div className="service-price">{service.price}</div>
                                        <div className="service-time">
                                            <i className="far fa-clock"></i> {service.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Section - بهینه و تعاملی */}
            <section className="section booking-section" data-animation-id="booking">
                <div className="section-container">
                    <div className="booking-wrapper">
                        <div className={`section-header text-center ${isAnimated('booking') ? 'animate-fade-in' : ''}`}>
                            <h2 className="section-title">رزرو نوبت آنلاین</h2>
                            <p className="section-subtitle">نوبت خود را به سادگی و سریع رزرو کنید و از تخفیف ویژه امروز بهره‌مند شوید</p>
                        </div>
                        <div className="booking-content">
                            <form
                                className="booking-form animate-fade-in-up"
                                onSubmit={(e) => e.preventDefault()}
                                data-animation-id="booking-form"
                            >
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">نام و نام خانوادگی</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            placeholder="نام کامل خود را وارد کنید"
                                            value={bookingForm.name}
                                            onChange={handleBookingFormChange}
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
                                            value={bookingForm.phone}
                                            onChange={handleBookingFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="service" className="form-label">خدمات مورد نظر</label>
                                        <select
                                            id="service"
                                            className="form-control"
                                            value={bookingForm.service}
                                            onChange={handleBookingFormChange}
                                            required
                                        >
                                            <option value="">انتخاب خدمات</option>
                                            <option value="haircut">برش مو</option>
                                            <option value="color">رنگ مو</option>
                                            <option value="makeup">آرایش صورت</option>
                                            <option value="nails">ناخن زنی</option>
                                            <option value="facial">مراقبت پوست</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date" className="form-label">تاریخ مراجعه</label>
                                        <input
                                            type="date"
                                            id="date"
                                            className="form-control"
                                            value={bookingForm.date}
                                            onChange={handleBookingFormChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="time" className="form-label">ساعت مراجعه</label>
                                        <select
                                            id="time"
                                            className="form-control"
                                            value={bookingForm.time}
                                            onChange={handleBookingFormChange}
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
                                        value={bookingForm.notes}
                                        onChange={handleBookingFormChange}
                                        rows="4"
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn btn-block">
                                    ثبت نوبت و دریافت کد رهگیری
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section - بهینه و ریسپانسیو */}
            <section className="section about-section" data-animation-id="about">
                <div className="section-container">
                    <div className="about-content">
                        <div className={`about-text animate-fade-in-up delay-1`} data-animation-id="about-text">
                            <div className="section-header">
                                <h2 className="section-title">درباره آرایشگاه BARBER SHOP</h2>
                            </div>
                            <div className="about-paragraphs">
                                <p className="about-paragraph">آرایشگاه BARBER SHOP با هدف ارائه خدمات آرایشی مردانه در سطحی حرفه‌ای و با کیفیت بالا تأسیس شده است. تیم ما از استایلیست‌های مجرب و با تجربه تشکیل شده که همواره در تلاشند تا بهترین خدمات را به مشتریان عزیز ارائه دهند.</p>
                                <p className="about-paragraph">ما با استفاده از جدیدترین تکنیک‌ها و بهترین محصولات موجود در بازار، تجربه‌ای منحصر به فرد از آرایش مردانه را برای شما فراهم می‌کنیم.</p>
                                <p className="about-paragraph">محیط آرام و دوستانه آرایشگاه، تجهیزات مدرن و خدمات شخصی‌سازی شده، همه و همه باعث شده تا BARBER SHOP به یکی از محبوب‌ترین آرایشگاه‌های مردانه در منطقه تبدیل شود.</p>
                            </div>
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

            {/* Contact Section - تعاملی و بهینه */}
            <section className="section contact-section" data-animation-id="contact">
                <div className="section-container">
                    <div className="contact-content">
                        <div className={`contact-info animate-fade-in-up delay-1`} data-animation-id="contact-info">
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
                                            <p
                                                className="contact-value"
                                                dangerouslySetInnerHTML={{ __html: info.value }}
                                            ></p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="social-links">
                                <a href="#" aria-label="اینستاگرام" className="social-link">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" aria-label="تلگرام" className="social-link">
                                    <i className="fab fa-telegram"></i>
                                </a>
                                <a href="#" aria-label="واتساپ" className="social-link">
                                    <i className="fab fa-whatsapp"></i>
                                </a>
                                <a href="#" aria-label="فیسبوک" className="social-link">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </div>
                        </div>
                        <div className={`contact-form animate-fade-in-up delay-2`} data-animation-id="contact-form">
                            <form onSubmit={(e) => e.preventDefault()} className="contact-form-content">
                                <div className="form-group">
                                    <label htmlFor="contact-name" className="form-label">نام و نام خانوادگی</label>
                                    <input
                                        type="text"
                                        id="contact-name"
                                        className="form-control"
                                        placeholder="نام کامل خود را وارد کنید"
                                        value={contactForm.name}
                                        onChange={handleContactFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-email" className="form-label">ایمیل</label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        className="form-control"
                                        placeholder="آدرس ایمیل خود را وارد کنید"
                                        value={contactForm.email}
                                        onChange={handleContactFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-subject" className="form-label">موضوع</label>
                                    <input
                                        type="text"
                                        id="contact-subject"
                                        className="form-control"
                                        placeholder="موضوع پیام"
                                        value={contactForm.subject}
                                        onChange={handleContactFormChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-message" className="form-label">پیام</label>
                                    <textarea
                                        id="contact-message"
                                        className="form-control"
                                        placeholder="پیام خود را بنویسید..."
                                        value={contactForm.message}
                                        onChange={(e) => handleContactFormChange({ target: { id: 'message', value: e.target.value } })}
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn btn-block">
                                    ارسال پیام
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Main;