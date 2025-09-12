// src/pages/ServicesPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import './Services.css';

const ServicesPage = () => {
  // 🔹 State برای تم
  const [theme, setTheme] = useState('dark');

  // 🔹 Intersection Observer برای انیمیشن
  useEffect(() => {
    const cards = document.querySelectorAll('.service-card');
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

    cards.forEach((card) => observer.observe(card));
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

  // 🔹 داده‌های خدمات
  const services = [
    {
      id: 1,
      title: 'Classic Haircut',
      description: 'Tailored haircut with precision and style.',
      price: 'From 350,000 Toman',
      duration: '45 min',
      image:
        'https://images.unsplash.com/photo-1562832918-d871ef8da87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      badge: 'Popular',
    },
    {
      id: 2,
      title: 'Beard Grooming',
      description: 'Detailed beard shaping and grooming.',
      price: 'From 200,000 Toman',
      duration: '30 min',
      image:
        'https://images.unsplash.com/photo-1599351431408-269d027d3cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      badge: 'New',
    },
    {
      id: 3,
      title: 'Hair Coloring',
      description: 'Premium coloring with lasting results.',
      price: 'From 500,000 Toman',
      duration: '60 min',
      image:
        'https://images.unsplash.com/photo-1596466596120-2a8e4b5d2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
  ];

  return (
    <div className="services-page">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="services-main">
        <section className="services-section" id="services">
          <div className="services-header">
            <h2 className="services-title">Our Services</h2>
            <p className="services-subtitle">
              Precision cuts, classic grooming, and modern styles
            </p>
            <div className="divider"></div>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`service-card fade-in-up delay-${index + 1}`}
              >
                <div className="service-image">
                  <img src={service.image} alt={service.title} />
                  {service.badge && (
                    <span
                      className={`badge ${service.badge === 'Popular' ? 'popular' : 'new'
                        }`}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-meta">
                    <span className="price">{service.price}</span>
                    <span className="duration">
                      <i className="far fa-clock"></i> {service.duration}
                    </span>
                  </div>
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

export default ServicesPage;