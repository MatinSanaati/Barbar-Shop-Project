// src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../../User/Header/Header';
import Footer from '../../../User/Footer/Footer';
import './Contact.css';

const ContactPage = () => {
  // 🔹 State برای فرم تماس
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // 🔹 State برای مدیریت تم
  const [theme, setTheme] = useState('dark');

  // 🔹 اطلاعات تماس
  const contactInfo = [
    { icon: 'fas fa-map-marker-alt', label: 'Address', value: 'Tehran, Valiasr Street, No. 1234' },
    { icon: 'fas fa-phone', label: 'Phone', value: '021-12345678' },
    { icon: 'fas fa-mobile-alt', label: 'Mobile', value: '0912 345 6789' },
    { icon: 'fas fa-envelope', label: 'Email', value: 'info@barbershop.ir' },
    { icon: 'fas fa-clock', label: 'Working Hours', value: 'Sat–Thu: 9 AM – 9 PM<br/>Fri: 9 AM – 6 PM' }
  ];

  // 🔹 لینک‌های شبکه اجتماعی
  const socialLinks = [
    { icon: 'fab fa-instagram', url: '#' },
    { icon: 'fab fa-telegram', url: '#' },
    { icon: 'fab fa-whatsapp', url: '#' },
    { icon: 'fab fa-facebook-f', url: '#' }
  ];

  // 🔹 Intersection Observer برای انیمیشن ورود
  useEffect(() => {
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

    const elements = document.querySelectorAll('.contact-info, .contact-form, .contact-item, .social-link');
    elements.forEach((el) => observer.observe(el));

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

  // 🔹 تغییر مقادیر فرم
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 🔹 ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill all fields!');
      return;
    }
    setSubmitted(true);
    setFormData({ name: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      {/* 🔝 هدر با تم فعلی و دکمه تغییر تم */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      {/* 🧱 محتوای اصلی بخش تماس */}
      <main className="contact-main">
        <section className="contact-me-section">
          <div className="contact-me-container">
            {/* Left Column - Contact Info */}
            <div className="contact-info">
              <h2 className="contact-title">Get In Touch</h2>
              <div className="underline"></div>
              <ul className="contact-list">
                {contactInfo.map((info, idx) => (
                  <li key={idx} className={`contact-item fade-in-left delay-${idx + 1}`}>
                    <div className="icon-wrapper">
                      <i className={info.icon}></i>
                    </div>
                    <div className="contact-text">
                      <h3 className="label">{info.label}</h3>
                      <p className="value" dangerouslySetInnerHTML={{ __html: info.value }}></p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="social-links">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className={`social-link fade-in-left delay-${idx + 1}`}
                    aria-label="social-link"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="contact-form fade-in-right">
              <h2 className="contact-title">Send a Message</h2>
              <div className="underline"></div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" type="tel" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" value={formData.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn-submit">
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
                {submitted && <div className="success-message">Your message has been sent!</div>}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 🔝 فوتر ثابت پایین صفحه */}
      <Footer />
    </div>
  );
};

export default ContactPage;