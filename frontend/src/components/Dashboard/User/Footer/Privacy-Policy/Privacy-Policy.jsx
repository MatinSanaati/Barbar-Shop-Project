import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import './Privacy-Policy.css';

const UserPrivacyPolicyPage = () => {
  // States
  const [theme, setTheme] = useState('dark');
  const [animatedElements, setAnimatedElements] = useState([]);

  // Intersection Observer برای انیمیشن اسکرول
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

  const isAnimated = (id) => animatedElements.includes(id);

  const privacySections = [
    {
      id: 1,
      title: "جمع‌آوری اطلاعات",
      content: "ما اطلاعات شخصی شما را فقط در صورتی و به اندازه‌ای جمع‌آوری می‌کنیم که برای ارائه خدمات به شما لازم باشد. اطلاعاتی که جمع‌آوری می‌کنیم شامل:",
      items: [
        "اطلاعات تماس (نام، شماره تلفن، ایمیل)",
        "اطلاعات نوبت‌دهی (تاریخ و زمان نوبت، نوع خدمات)",
        "اطلاعات پرداخت (شماره کارت، کد رهگیری تراکنش)",
        "اطلاعات دستگاه (IP، نوع مرورگر، سیستم عامل)"
      ]
    },
    {
      id: 2,
      title: "استفاده از اطلاعات",
      content: "اطلاعات جمع‌آوری شده صرفاً برای اهداف زیر استفاده خواهد شد:",
      items: [
        "ارائه و بهبود خدمات آرایشگاه",
        "مدیریت نوبت‌دهی و ارتباط با مشتریان",
        "پردازش پرداخت‌ها و صدور فاکتور",
        "ارسال پیامک/ایمیل یادآوری نوبت",
        "تحلیل رفتار کاربران برای بهبود خدمات"
      ]
    },
    {
      id: 3,
      title: "اشتراک‌گذاری اطلاعات",
      content: "ما اطلاعات شخصی شما را با اشخاص ثالث به اشتراک نمی‌گذاریم، مگر در موارد زیر:",
      items: [
        "برای ارائه خدمات پرداخت از طریق درگاه‌های معتبر بانکی",
        "برای رعایت الزامات قانونی و دستور مقامات قضایی",
        "در صورت دریافت رضایت صریح شما"
      ]
    },
    {
      id: 4,
      title: "حقوق شما",
      content: "شما حق دارید:",
      items: [
        "درخواست دسترسی به اطلاعات شخصی خود کنید",
        "در صورت نادرست بودن اطلاعات، درخواست اصلاح آن را دهید",
        "در صورت عدم نیاز، درخواست حذف اطلاعات خود را دهید",
        "در صورت تمایل، از دریافت پیامک/ایمیل انصراف دهید"
      ]
    },
    {
      id: 5,
      title: "امنیت اطلاعات",
      content: "ما از آخرین فناوری‌های امنیتی برای محافظت از اطلاعات شما استفاده می‌کنیم. تمامی اطلاعات در سرورهای ایمن و رمزگذاری شده ذخیره می‌شوند."
    }
  ];

  const termsSections = [
    {
      id: 1,
      title: "شرایط عمومی",
      content: "استفاده از خدمات آرایشگاه BARBER SHOP به معنی پذیرش کامل قوانین و مقررات زیر است:",
      items: [
        "کلیه خدمات تنها برای افراد بالای 18 سال قابل استفاده است",
        "ثبت نوبت به منزله قبول شرایط لغو و تغییر نوبت است",
        "کاربر مسئول صحت اطلاعات وارد شده در سیستم است",
        "آرایشگاه حق تغییر قیمت خدمات را بدون اطلاع قبلی دارد"
      ]
    },
    {
      id: 2,
      title: "نوبت‌دهی و لغو نوبت",
      content: "قوانین مربوط به نوبت‌دهی و لغو نوبت:",
      items: [
        "لغو نوبت باید حداقل 2 ساعت قبل از زمان مقرر انجام شود",
        "لغو نوبت در بازه زمانی کمتر از 2 ساعت، موجب کسر هزینه خواهد شد",
        "عدم حضور در زمان نوبت، موجب لغو نوبت بدون بازگشت هزینه است",
        "تغییر زمان نوبت تنها یک بار و با تماس با پشتیبانی امکان‌پذیر است"
      ]
    },
    {
      id: 3,
      title: "پرداخت و بازگشت وجه",
      content: "قوانین مربوط به پرداخت و بازگشت وجه:",
      items: [
        "پرداخت کلیه هزینه‌ها قبل از ارائه خدمات انجام می‌شود",
        "در صورت لغو خدمات توسط آرایشگاه، کل مبلغ پرداختی بازگردانده می‌شود",
        "بازگشت وجه در صورت عدم رضایت از خدمات، بر اساس تصمیم مدیریت است",
        "در صورت مشکل در پرداخت، کاربر می‌تواند با پشتیبانی تماس بگیرد"
      ]
    },
    {
      id: 4,
      title: "حقوق مالکیت فکری",
      content: "کلیه محتوای سایت و خدمات متعلق به آرایشگاه BARBER SHOP است:",
      items: [
        "کپی‌برداری از محتوای سایت بدون اجازه ممنوع است",
        "استفاده از لوگو و نام تجاری تنها با مجوز رسمی امکان‌پذیر است",
        "طراحی و رابط کاربری سایت تحت حمایت قانون کپی‌رایت است"
      ]
    },
    {
      id: 5,
      title: "تغییرات قوانین",
      content: "آرایشگاه حق تغییر قوانین را بدون اطلاع قبلی دارد:",
      items: [
        "تغییرات در این صفحه اعمال خواهد شد",
        "استفاده ادامه از خدمات به معنی پذیرش تغییرات است",
        "در صورت عدم پذیرش تغییرات، کاربر می‌تواند حساب خود را حذف کند"
      ]
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
    <div className="privacy-policy-page">
      {/* Header */}
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="privacy-main">
        {/* Hero Section */}
        <section className="hero" data-animation-id="hero">
          <div className="hero-content">
            <div className={`hero-text ${isAnimated('hero') ? 'animate-fade-in-up' : ''}`}>
              <h1 className="hero-title">حریم خصوصی و قوانین</h1>
              <p className="hero-description">
                اطلاع از سیاست‌های حریم خصوصی و قوانین استفاده از خدمات آرایشگاه BARBER SHOP
              </p>
              <a href="#privacy-policy" className="btn btn-primary">
                <i className="fas fa-arrow-down"></i> مشاهده جزئیات
              </a>
            </div>
          </div>
        </section>

        {/* Privacy Policy Section */}
        <section id="privacy-policy" className="section privacy-policy-section" data-animation-id="privacy">
          <div className="container">
            <div className={`section-header ${isAnimated('privacy') ? 'animate-fade-in-up' : ''}`}>
              <h2 className="section-title">سیاست حریم خصوصی</h2>
              <p className="section-subtitle">آرایشگاه BARBER SHOP متعهد به حفاظت از اطلاعات شخصی شماست</p>
            </div>
            <div className="policy-content">
              {privacySections.map((section, index) => (
                <div
                  key={section.id}
                  className={`policy-section animate-fade-in-up delay-${index + 1}`}
                  data-animation-id={`privacy-${section.id}`}
                >
                  <h3 className="policy-title">{section.title}</h3>
                  <p className="policy-description">{section.content}</p>
                  {section.items && (
                    <ul className="policy-list">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="policy-item">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Terms Section */}
        <section className="section terms-section" data-animation-id="terms">
          <div className="container">
            <div className={`section-header ${isAnimated('terms') ? 'animate-fade-in-up' : ''}`}>
              <h2 className="section-title">قوانین و شرایط استفاده</h2>
              <p className="section-subtitle">قوانین و مقررات استفاده از خدمات آرایشگاه BARBER SHOP</p>
            </div>
            <div className="policy-content">
              {termsSections.map((section, index) => (
                <div
                  key={section.id}
                  className={`policy-section animate-fade-in-up delay-${index + 1}`}
                  data-animation-id={`terms-${section.id}`}
                >
                  <h3 className="policy-title">{section.title}</h3>
                  <p className="policy-description">{section.content}</p>
                  {section.items && (
                    <ul className="policy-list">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="policy-item">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserPrivacyPolicyPage;