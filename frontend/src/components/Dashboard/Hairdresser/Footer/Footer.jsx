// src/components/Dashboard/Hairdresser/Footer/HairdresserFooter.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const [feedback, setFeedback] = useState({
        type: 'suggestion',
        message: '',
        contact: ''
    });
    const [showForm, setShowForm] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // در حالت واقعی اینجا API می‌زنی
        console.log('Feedback submitted:', feedback);
        setSubmitStatus('ممنون از بازخورد شما! پیام شما دریافت شد.');
        setTimeout(() => {
            setSubmitStatus('');
            setFeedback({ type: 'suggestion', message: '', contact: '' });
            setShowForm(false);
        }, 3000);
    };

    return (
        <footer className="hairdresser-footer">
            <div className="footer-content">
                {/* بخش اصلی فوتر */}
                <div className="footer-grid">
                    {/* درباره داشبورد */}
                    <div className="footer-col">
                        <h3 className="footer-title">داشبورد آرایشگر</h3>
                        <p className="footer-description">
                            این داشبورد برای مدیریت حرفه‌ای نوبت‌ها، مشتریان و درآمد شما طراحی شده.
                        </p>
                        <button
                            className="feedback-btn"
                            onClick={() => setShowForm(!showForm)}
                            aria-expanded={showForm}
                        >
                            <i className="fas fa-comment-dots"></i> ارتباط با توسعه‌دهنده
                        </button>
                    </div>

                    {/* لینک‌های سریع */}
                    <div className="footer-col">
                        <h3 className="footer-title">صفحات داشبورد</h3>
                        <ul className="footer-links">
                            <li>
                                <Link to="/hairdresser/dashboard">
                                    <i className="fas fa-home"></i> داشبورد
                                </Link>
                            </li>
                            <li>
                                <Link to="/hairdresser/work-plan">
                                    <i className="fas fa-calendar-alt"></i> برنامه کاری
                                </Link>
                            </li>
                            <li>
                                <Link to="/hairdresser/turns">
                                    <i className="fas fa-calendar-check"></i> نوبت‌های من
                                </Link>
                            </li>
                            <li>
                                <Link to="/hairdresser/customers">
                                    <i className="fas fa-users"></i> مشتریان
                                </Link>
                            </li>
                            <li>
                                <Link to="/hairdresser/report">
                                    <i className="fas fa-chart-line"></i> گزارش‌ها
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* پشتیبانی و بازخورد */}
                    <div className="footer-col">
                        <h3 className="footer-title">پشتیبانی</h3>
                        <ul className="footer-links">
                            <li>
                                <a href="tel:+989123456789">
                                    <i className="fas fa-phone"></i> تماس مستقیم
                                </a>
                            </li>
                            <li>
                                <a href="mailto:support@barbershop.ir">
                                    <i className="fas fa-envelope"></i> ایمیل پشتیبانی
                                </a>
                            </li>
                            <li>
                                <button
                                    className="link-button"
                                    onClick={() => setShowForm(!showForm)}
                                >
                                    <i className="fas fa-bug"></i> گزارش مشکل
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* فرم بازخورد (قابل باز و بسته شدن) */}
                {showForm && (
                    <div className="feedback-form-container animate-fade-in">
                        <form onSubmit={handleSubmit} className="feedback-form">
                            <h4>ارسال بازخورد</h4>
                            <div className="form-group">
                                <label htmlFor="type">نوع بازخورد</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={feedback.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="suggestion">پیشنهاد بهبود</option>
                                    <option value="bug">گزارش باگ</option>
                                    <option value="feature">درخواست قابلیت جدید</option>
                                    <option value="complaint">شکایت یا مشکل</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">توضیحات</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={feedback.message}
                                    onChange={handleChange}
                                    placeholder="توضیحات خود را بنویسید..."
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact">شماره تماس یا ایمیل (اختیاری)</label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    value={feedback.contact}
                                    onChange={handleChange}
                                    placeholder="برای پیگیری تماس بگیرید"
                                />
                            </div>
                            <div className="form-actions">
                                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                                    بستن
                                </button>
                                <button type="submit" className="btn-primary">
                                    ارسال بازخورد
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* وضعیت ارسال */}
                {submitStatus && (
                    <div className="submit-status">
                        <i className="fas fa-check-circle"></i> {submitStatus}
                    </div>
                )}

                {/* کپی‌رایت */}
                <div className="copyright">
                    <p>
                        &copy; {new Date().getFullYear()} BARBER SHOP. تمامی حقوق محفوظ است. | نسخه <strong>1.2.0</strong>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;