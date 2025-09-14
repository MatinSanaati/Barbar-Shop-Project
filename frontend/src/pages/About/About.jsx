import React, { useEffect, useState } from 'react';
import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import './About.css';

const AboutPage = () => {
    const [theme, setTheme] = useState('dark');

    // 🔹 Intersection Observer برای انیمیشن ورود
    useEffect(() => {
        const items = document.querySelectorAll('.fade-in-left, .fade-in-right');
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

        items.forEach(item => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    // 🔹 بارگذاری تم از localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    // 🔹 تغییر تم
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className="about-page" dir="rtl">
            <Header theme={theme} toggleTheme={toggleTheme} />

            <main className="about-main">
                <section className="about-section" id="about">
                    <div className="about-container about-content">
                        {/* متن درباره ما */}
                        <div className="about-text fade-in-left">
                            <h2 className="about-title">درباره ما</h2>
                            <div className="underline"></div>
                            <p>
                                سالن ما با بیش از ۸ سال تجربه در زمینه آرایش و پیرایش آقایان،
                                همواره تلاش کرده است تا بهترین خدمات را با بالاترین کیفیت ارائه دهد.
                                از اصلاح کلاسیک گرفته تا استایل‌های مدرن، هدف ما ایجاد ظاهری شیک و
                                متناسب با شخصیت شماست.
                            </p>
                            <p>
                                ما باور داریم که آراستگی تنها یک خدمت ساده نیست، بلکه یک تجربه
                                متفاوت است که به شما اعتمادبه‌نفس و حس خوب می‌بخشد.
                                هر مشتری برای ما منحصر‌به‌فرد است و خدمات متناسب با سبک زندگی
                                و سلیقه او ارائه می‌شود.
                            </p>
                            <p>
                                ترکیب دانش سنتی و تکنیک‌های مدرن در کنار استفاده از بهترین مواد،
                                راز ماندگاری و کیفیت بالای کار ماست.
                                هدف ما ایجاد فضایی دلنشین برای تجربه‌ای خاص و به‌یادماندنی است.
                            </p>
                        </div>

                        {/* تصویر */}
                        <div className="about-image fade-in-right">
                            <img
                                src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                                alt="سالن آرایشگری"
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;