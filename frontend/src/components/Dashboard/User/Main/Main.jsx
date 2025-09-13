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
            title: "Classic Haircut",
            description: "Precision haircut tailored to your style.",
            price: "From 350,000 Toman | 45 min",
            image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
            badge: "Popular",
        },
        {
            id: 2,
            title: "Beard Trim",
            description: "Detailed beard shaping and grooming.",
            price: "From 200,000 Toman | 30 min",
            image: "https://images.unsplash.com/photo-1599351431408-269d027d3cfd",
            badge: "New",
        },
        {
            id: 3,
            title: "Hair Coloring",
            description: "Premium coloring with lasting results.",
            price: "From 500,000 Toman | 60 min",
            image: "https://images.unsplash.com/photo-1596466596120-2a8e4b5d2c4d",
        },
    ];

    return (
        <main>
            {/* Hero Section */}
            <section className="hero fade-in-up">
                <div className="hero-overlay">
                    <h1 className="hero-title">Barber Studio</h1>
                    <p className="hero-subtitle">Precision Cuts & Classic Grooming</p>
                    <div className="hero-buttons">
                        <a href="#services" className="btn btn-gold">
                            <i className="fas fa-cut"></i> Our Services
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            <i className="fas fa-calendar-alt"></i> Book Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services fade-in-up">
                <h2 className="section-title">Our Services</h2>
                <p className="section-subtitle">Crafted with precision and care</p>
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
                                        className={`badge ${service.badge === "Popular" ? "popular" : "new"
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

            {/* About Section */}
            <section id="about" className="about slide-in">
                <div className="about-text">
                    <h2 className="section-title underline">About Us</h2>
                    <p>
                        Welcome to Barber Studio – a single-barber salon where tradition
                        meets modern style.
                    </p>
                    <p>
                        With years of experience and dedication, we provide precision cuts,
                        refined grooming, and a tailored service that elevates your look.
                    </p>
                    <p>
                        Our philosophy: every client deserves a luxury experience and
                        confidence that lasts beyond the chair.
                    </p>
                </div>
                <div className="about-image">
                    <img
                        src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b"
                        alt="About Barber"
                    />
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact fade-in-up">
                <div className="contact-info">
                    <h2 className="section-title">Contact Us</h2>
                    <ul>
                        <li>
                            <i className="fas fa-map-marker-alt"></i> Tehran, Iran
                        </li>
                        <li>
                            <i className="fas fa-phone-alt"></i> +98 912 123 4567
                        </li>
                        <li>
                            <i className="fas fa-envelope"></i> barber@studio.com
                        </li>
                        <li>
                            <i className="fas fa-clock"></i> Sat-Thu: 10:00 - 20:00
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
                        <input type="text" placeholder="Name" required />
                        <input type="tel" placeholder="Phone" required />
                        <textarea placeholder="Message" required></textarea>
                        <button type="submit" className="btn btn-gold">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Main;