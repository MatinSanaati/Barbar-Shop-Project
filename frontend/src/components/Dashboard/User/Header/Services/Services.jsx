// src/pages/ServicesPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../../User/Header/Header';
import Footer from '../../../User/Footer/Footer';
import './Services.css';

const ServicesPage = () => {
  const [theme, setTheme] = useState('dark');

  // 🎬 Intersection Observer برای انیمیشن کارت‌ها
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

  // 🎨 بارگذاری تم
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // 🌗 تغییر تم
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // ✂️ لیست خدمات
  const services = [
    {
      id: 1,
      title: 'اصلاح کلاسیک',
      description: 'اصلاح موی دقیق و تمیز متناسب با استایل شما.',
      price: 'از ۳۵۰,۰۰۰ تومان',
      duration: '۴۵ دقیقه',
      image:
        'https://images.unsplash.com/photo-1562832918-d871ef8da87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      badge: 'محبوب',
    },
    {
      id: 2,
      title: 'اصلاح و فرم دهی ریش',
      description: 'فرم دهی و مرتب‌سازی ریش با جزئیات کامل.',
      price: 'از ۲۰۰,۰۰۰ تومان',
      duration: '۳۰ دقیقه',
      image:
        'https://images.unsplash.com/photo-1599351431408-269d027d3cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      badge: 'جدید',
    },
    {
      id: 3,
      title: 'رنگ مو',
      description: 'رنگ موی حرفه‌ای با ماندگاری بالا.',
      price: 'از ۵۰۰,۰۰۰ تومان',
      duration: '۶۰ دقیقه',
      image:
        'https://images.unsplash.com/photo-1596466596120-2a8e4b5d2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    },
  ];

  return (
    <div className="services-page" dir="rtl">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="services-main">
        <section className="services-section" id="services">
          <div className="services-header">
            <h2 className="services-title">خدمات ما</h2>
            <p className="services-subtitle">
              اصلاح دقیق، آرایش کلاسیک و استایل‌های مدرن
            </p>
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
                      className={`badge ${service.badge === 'محبوب' ? 'popular' : 'new'
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