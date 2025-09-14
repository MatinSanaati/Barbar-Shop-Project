import React, { useEffect } from "react";
import "./Main.css";

const Main = () => {
    useEffect(() => {
        const sections = document.querySelectorAll(".fade-in-up, .slide-in");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const services = [
        {
            id: 1,
            title: "کوتاهی کلاسیک",
            description: "اصلاح دقیق و کلاسیک متناسب با استایل شما.",
            price: "از ۳۵۰,۰۰۰ تومان | ۴۵ دقیقه",
            image:
                "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
            badge: "محبوب",
        },
        {
            id: 2,
            title: "خط ریش و محاسن",
            description: "اصلاح و فرم‌دهی تخصصی ریش و سبیل.",
            price: "از ۲۰۰,۰۰۰ تومان | ۳۰ دقیقه",
            image:
                "https://images.unsplash.com/photo-1599351431408-269d027d3cfd",
            badge: "جدید",
        },
        {
            id: 3,
            title: "رنگ مو",
            description: "رنگ مو حرفه‌ای با ماندگاری بالا.",
            price: "از ۵۰۰,۰۰۰ تومان | ۶۰ دقیقه",
            image:
                "https://images.unsplash.com/photo-1596466596120-2a8e4b5d2c4d",
        },
    ];

    return (
        <main dir="rtl">
            {/* بخش هیرو */}
            <section className="hero fade-in-up">
                <div className="hero-overlay">
                    <h1 className="hero-title">آرایشگاه مردانه</h1>
                    <p className="hero-subtitle">
                        اصلاح حرفه‌ای و خدمات ویژه آقایان
                    </p>
                    <div className="hero-buttons">
                        <a href="#services" className="btn btn-gold">
                            <i className="fas fa-cut"></i> خدمات ما
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            <i className="fas fa-calendar-alt"></i> رزرو نوبت
                        </a>
                    </div>
                </div>
            </section>

            {/* بخش خدمات */}
            <section id="services" className="services fade-in-up">
                <h2 className="section-title">خدمات ما</h2>
                <p className="section-subtitle">با دقت و کیفیت ممتاز</p>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`service-card delay-${index + 1}`}
                        >
                            <div className="service-image">
                                <img src={service.image} alt={service.title} />
                                {service.badge && (
                                    <span
                                        className={`badge ${service.badge === "محبوب" ? "popular" : "new"
                                            }`}
                                    >
                                        {service.badge}
                                    </span>
                                )}
                            </div>
                            <div className="service-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <span className="service-meta">{service.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* بخش درباره ما */}
            <section id="about" className="about slide-in">
                <div className="about-text">
                    <h2 className="section-title underline">درباره ما</h2>
                    <p>
                        به آرایشگاه مردانه ما خوش آمدید – جایی که سنت و مدرنیته به هم
                        می‌رسند.
                    </p>
                    <p>
                        با سال‌ها تجربه، ما اصلاح دقیق، خدمات تخصصی و تجربه‌ای لوکس را
                        برای شما فراهم می‌کنیم.
                    </p>
                    <p>
                        باور ما: هر مشتری شایسته یک تجربه خاص و اعتماد به نفس ماندگار
                        است.
                    </p>
                </div>
                <div className="about-image">
                    <img
                        src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b"
                        alt="درباره آرایشگاه"
                    />
                </div>
            </section>

            {/* بخش تماس */}
            <section id="contact" className="contact fade-in-up">
                <div className="contact-info">
                    <h2 className="section-title">تماس با ما</h2>
                    <ul>
                        <li>
                            <i className="fas fa-map-marker-alt"></i> تهران، ایران
                        </li>
                        <li>
                            <i className="fas fa-phone-alt"></i> ۰۹۱۲ ۱۲۳ ۴۵۶۷
                        </li>
                        <li>
                            <i className="fas fa-envelope"></i> barber@studio.com
                        </li>
                        <li>
                            <i className="fas fa-clock"></i> شنبه تا پنجشنبه: ۱۰:۰۰ – ۲۰:۰۰
                        </li>
                    </ul>
                    <div className="social-links">
                        <a href="#">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-telegram-plane"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
                <div className="contact-form">
                    <form>
                        <input type="text" placeholder="نام و نام خانوادگی" required />
                        <input type="tel" placeholder="شماره تماس" required />
                        <textarea placeholder="پیام شما" required></textarea>
                        <button type="submit" className="btn btn-gold">
                            ارسال پیام
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Main;