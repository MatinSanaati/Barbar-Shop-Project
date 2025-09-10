import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import './Contact.css';

const ContactPage = () => {
  // States
  const [theme, setTheme] = useState('dark');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // State برای انیمیشن‌های اسکرول (مثل Main)
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

  // تابع بررسی انیمیشن
  const isAnimated = (id) => animatedElements.includes(id);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // اطلاعات تماس (مثل Main)
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
    <div className="contact-page">
      {/* هدر */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="contact-main">
        {/* Hero Section - مشابه Main */}
        <section className="hero-section" data-animation-id="hero">
          <div className="hero-container">
            <div className="hero-content">
              <div className={`hero-text ${isAnimated('hero') ? 'animate-fade-in-up' : ''}`}>
                <h1 className="hero-title">تماس با ما</h1>
                <p className="hero-description">
                  سوالی دارید یا نیاز به راهنمایی دارید؟ با ما در تماس باشید و از خدمات تخصصی استایلیست‌های برتر لذت ببرید.
                </p>
                <Link to="#contact" className="btn btn-primary">
                  <i className="fas fa-arrow-down"></i> ادامه مطلب
                </Link>
              </div>
            </div>
          </div>
          <div className="hero-overlay"></div>
        </section>

        {/* Contact Section - کاملاً مشابه Main با انیمیشن */}
        <section id="contact" className="section contact-section" data-animation-id="contact">
          <div className="section-container">
            <div className="contact-content">
              {/* اطلاعات تماس */}
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

              {/* فرم تماس */}
              <div className={`contact-form animate-fade-in-up delay-2`} data-animation-id="contact-form">
                <form onSubmit={handleFormSubmit} className="contact-form-content">
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
                    <label htmlFor="email" className="form-label">ایمیل</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="آدرس ایمیل خود را وارد کنید"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">موضوع</label>
                    <input
                      type="text"
                      id="subject"
                      className="form-control"
                      placeholder="موضوع پیام"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">پیام</label>
                    <textarea
                      id="message"
                      className="form-control"
                      placeholder="پیام خود را بنویسید..."
                      value={formData.message}
                      onChange={handleInputChange}
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

            {/* نقشه (اختیاری - از ContactPage فعلی گرفته شده) */}
            <div className={`map-section animate-fade-in-up delay-3`} data-animation-id="contact-map">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.623051680243!2d51.42159431517979!3d35.72927198018803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00b9d8f3b9b9%3A0x8a9b9b9b9b9b9b9b!2sVali-e%20Asr%20St%2C%20Tehran%2C%20Iran!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                  title="موقعیت آرایشگاه"
                  className="map-iframe"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* فوتر */}
      <Footer />
    </div>
  );
};

export default ContactPage;