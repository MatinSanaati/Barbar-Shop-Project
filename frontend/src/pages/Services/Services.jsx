import React, { useEffect, useState } from 'react';
import { data, Link } from 'react-router-dom';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import './Services.css';

const ServicesPage = () => {
  // States
  const [theme, setTheme] = useState('dark');

  // داده‌های خدمات
  const services = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "برش مو",
      description: "برش مو با تکنیک‌های مدرن و مطابق با آخرین استایل‌ها توسط استایلیست‌های حرفه‌ای",
      price: "120,000 تومان",
      time: "45 دقیقه",
      badge: "پرفروش"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1599351431408-269d027d3cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "ریش تراشی",
      description: "طراحی و تراش حرفه‌ای ریش با توجه به فرم صورت و سلیقه شخصی شما",
      price: "80,000 تومان",
      time: "30 دقیقه",
      badge: "جدید"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1596466596120-2a8e4b5d2c4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "رنگ مو",
      description: "رنگ‌آمیزی مو با بهترین محصولات و تکنیک‌های مدرن برای حفظ سلامت مو",
      price: "180,000 تومان",
      time: "60 دقیقه"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1605497787128-3ff550e67194?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "اصلاح کامل",
      description: "اصلاح مو و ریش با تجهیزات حرفه‌ای و محصولات مرغوب",
      price: "150,000 تومان",
      time: "50 دقیقه"
    }
  ];

  // داده‌های دسته‌بندی‌ها
  const categories = [
    {
      id: 1,
      icon: "fas fa-cut",
      title: "مو",
      description: "برش، رنگ، فر و صاف کردن مو با جدیدترین تکنیک‌ها و محصولات با کیفیت"
    },
    {
      id: 2,
      icon: "fas fa-user",
      title: "ریش",
      description: "طراحی و تراش حرفه‌ای ریش با توجه به فرم صورت و سلیقه شخصی شما"
    },
    {
      id: 3,
      icon: "fas fa-soap",
      title: "مراقبت",
      description: "خدمات ماساژ صورت، مراقبت از پوست و استفاده از محصولات مرغوب"
    },
    {
      id: 4,
      icon: "fas fa-spa",
      title: "زیبایی",
      description: "خدمات تخصصی زیبایی شامل اپیلاسیون، ماساژ و مراقبت‌های ویژه"
    }
  ];

  // داده‌های نظرات مشتریان
  const testimonials = [
    {
      id: 1,
      text: "خدمات فوق‌العاده‌ای دارید! استایلیست حرفه‌ای و فضایی آرامش‌بخش. قطعاً دوباره مراجعه می‌کنم. سیستم نوبت‌دهی آنلاین هم بسیار راحت و سریع است.",
      clientName: "رضا محمدی",
      clientTitle: "مشتری ثابت",
      clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      text: "با سیستم نوبت‌دهی آنلاین شما، دیگه نیازی نیست صف بایستم. وقت خودم رو مدیریت می‌کنم! استایلیست آقای رضایی فوق‌العاده‌اند.",
      clientName: "احمد کریمی",
      clientTitle: "مشتری راضی",
      clientImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      text: "طراحی سایت بسیار زیبا و کاربرپسند. رزرو نوبت آنلاین خیلی راحت و سریع انجام می‌شه. فضای آرایشگاه هم بسیار شیک و مدرن است.",
      clientName: "مهدی نوری",
      clientTitle: "مشتری وفادار",
      clientImage: "https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
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
    <div className="services-page">
      {/* */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="services-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-text animate-fade-in-up">
                <h1 className="hero-title">خدمات تخصصی آرایش مردانه</h1>
                <p className="hero-description">تجربه آرایش مردانه در سطح حرفه‌ای با سیستم نوبت‌دهی آنلاین و استایلیست‌های برتر</p>
                <div className="hero-buttons animate-fade-in-up delay-2">
                  <Link to="/TakingturnsPage" className="btn btn-primary">
                    <i className="fas fa-calendar-alt"></i> رزرو نوبت آنلاین
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

        {/* Services Section */}
        <section className="section services-section">
          <div className="container">
            <div className="section-header animate-fade-in">
              <h2 className="section-title">خدمات ما</h2>
              <p className="section-subtitle">مجموعه‌ای از خدمات تخصصی و حرفه‌ای در زمینه آرایش مردانه</p>
            </div>
            <div className="services-grid">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`service-card animate-fade-in-up delay-${index + 1}`}
                  data-category={service.category}
                >
                  <div className="service-image">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="service-img"
                    />
                    {service.badge && (
                      <div className={`service-badge badge-${service.badge === 'پرفروش' ? 'popular' : 'new'}`}>
                        {service.badge}
                      </div>
                    )}
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

        {/* Categories Section */}
        <section className="section categories-section">
          <div className="container">
            <div className="section-header text-center animate-fade-in">
              <h2 className="section-title">دسته‌بندی خدمات</h2>
              <p className="section-subtitle">خدمات ما در دسته‌های مختلف برای پاسخگویی به تمام نیازهای آرایشی شما</p>
            </div>
            <div className="categories-grid">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className={`category-card animate-fade-in-up delay-${index + 1}`}
                >
                  <div className="category-icon">
                    <i className={category.icon}></i>
                  </div>
                  <h3 className="category-title">{category.title}</h3>
                  <p className="category-description">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section testimonials-section">
          <div className="container">
            <div className="section-header text-center animate-fade-in">
              <h2 className="section-title">نظرات مشتریان</h2>
              <p className="section-subtitle">تجربه دیگران از خدمات ما</p>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`testimonial-card animate-fade-in-up delay-${index + 1}`}
                >
                  <div className="quote-icon">
                    <i className="fas fa-quote-right"></i>
                  </div>
                  <div className="testimonial-content">
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="client">
                      <div className="client-image">
                        <img src={testimonial.clientImage} alt={testimonial.clientName} loading="lazy" />
                      </div>
                      <div className="client-info">
                        <h4 className="client-name">{testimonial.clientName}</h4>
                        <p className="client-title">{testimonial.clientTitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section cta-section">
          <div className="container">
            <div className="cta-content text-center animate-fade-in">
              <h2 className="cta-title">آماده برای تجربه آرایش حرفه‌ای؟</h2>
              <p className="cta-description">نوبت خود را همین امروز رزرو کنید و از تخفیف ویژه امروز بهره‌مند شوید</p>
              <Link to="/TakingturnsPage" className="btn btn-secondary animate-fade-in-up delay-2">
                <i className="fas fa-calendar-alt"></i> رزرو نوبت آنلاین
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* */}
      <Footer />
    </div>
  );
};

export default ServicesPage;