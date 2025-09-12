// src/pages/PrivacyPolicyPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import './Privacy-Policy.css';

const PrivacyPolicyPage = () => {
  // 🔹 State برای مدیریت تم
  const [theme, setTheme] = useState('dark');

  // 🔹 داده‌های حریم خصوصی و شرایط
  const privacyPoints = [
    "Information We Collect: name, phone, email, appointment details.",
    "How We Use Your Data: booking management, reminders, service improvement.",
    "Data Security: encrypted storage and secure servers.",
    "Third-Party Sharing: only for payments or legal compliance.",
    "Your Rights: access, update, or delete your data anytime."
  ];

  const termsPoints = [
    "Booking Policy: using our online reservation confirms your agreement.",
    "Cancellation: must be done at least 2 hours in advance.",
    "No-Show: missed appointments without notice may be charged.",
    "Payment: full payment required before service.",
    "Changes to Policies: we reserve the right to update these terms."
  ];

  // 🔹 Intersection Observer برای انیمیشن ورود
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = document.querySelectorAll(".fade-in-up");
    items.forEach(item => observer.observe(item));

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

  return (
    <div className="privacy-policy-page">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="privacy-main">
        <section className="privacy-policy-section">
          {/* Hero */}
          <div className="policy-hero fade-in-up">
            <h1 className="policy-title"><i className="fas fa-lock"></i> Privacy & Terms</h1>
            <p className="policy-subtitle">
              Your data is safe with us. Learn how we protect your information and what you agree to when booking.
            </p>
          </div>

          {/* Privacy Policy */}
          <div className="policy-content fade-in-up">
            <h2 className="section-title">Privacy Policy</h2>
            <ul className="policy-list">
              {privacyPoints.map((point, idx) => (
                <li key={idx} className={`fade-in-up delay-${idx + 1}`}>
                  <i className="fas fa-check-circle"></i> {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Terms of Service */}
          <div className="policy-content fade-in-up">
            <h2 className="section-title">Terms & Conditions</h2>
            <ul className="policy-list">
              {termsPoints.map((point, idx) => (
                <li key={idx} className={`fade-in-up delay-${idx + 1}`}>
                  <i className="fas fa-file-alt"></i> {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Final Note */}
          <div className="policy-final fade-in-up">
            <p>
              By using our booking system, you acknowledge that you have read and agreed to these policies.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;