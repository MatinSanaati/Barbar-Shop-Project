// src/pages/PrivacyPolicyPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import './Privacy-Policy.css';

const PrivacyPolicyPage = () => {
  // 🔹 State برای مدیریت تم
  const [theme, setTheme] = useState('dark');

  // 🔹 داده‌های حریم خصوصی
  const privacyPoints = [
    "اطلاعاتی که جمع‌آوری می‌کنیم: نام، شماره تلفن، ایمیل و جزئیات نوبت.",
    "نحوه استفاده از داده‌ها: مدیریت رزرو، ارسال یادآوری‌ها و بهبود خدمات.",
    "امنیت داده‌ها: ذخیره‌سازی رمزنگاری‌شده و سرورهای امن.",
    "اشتراک‌گذاری با اشخاص ثالث: فقط برای پرداخت یا الزامات قانونی.",
    "حقوق شما: دسترسی، ویرایش یا حذف اطلاعات شخصی در هر زمان."
  ];

  // 🔹 شرایط و قوانین
  const termsPoints = [
    "سیاست رزرو: استفاده از سیستم آنلاین به منزله پذیرش قوانین است.",
    "لغو نوبت: حداقل باید ۲ ساعت قبل انجام شود.",
    "عدم حضور: در صورت عدم اطلاع قبلی، ممکن است هزینه دریافت شود.",
    "پرداخت: پرداخت کامل قبل از ارائه خدمات الزامی است.",
    "تغییرات: ما حق تغییر این قوانین را داریم."
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
    <div className="privacy-policy-page" dir="rtl">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="privacy-main">
        <section className="privacy-policy-section">
          {/* Hero */}
          <div className="policy-hero fade-in-up">
            <h1 className="policy-title"><i className="fas fa-lock"></i> حریم خصوصی و شرایط</h1>
            <p className="policy-subtitle">
              اطلاعات شما نزد ما محفوظ است. در این بخش می‌توانید با نحوه حفاظت از داده‌ها و قوانین رزرو آشنا شوید.
            </p>
          </div>

          {/* Privacy Policy */}
          <div className="policy-content fade-in-up">
            <h2 className="section-title">سیاست‌های حریم خصوصی</h2>
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
            <h2 className="section-title">شرایط و قوانین</h2>
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
              با استفاده از سیستم رزرو آنلاین، شما تأیید می‌کنید که این قوانین و سیاست‌ها را مطالعه کرده‌اید و پذیرفته‌اید.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;