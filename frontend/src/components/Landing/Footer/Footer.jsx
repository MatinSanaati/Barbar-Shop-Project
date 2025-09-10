import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <div className="footer-grid">
                    <div className="footer-col">
                        <h3 className="footer-title">BARBER SHOP</h3>
                        <p className="footer-description">ارائه‌دهنده خدمات تخصصی آرایش مردانه با جدیدترین تکنیک‌ها و محصولات با کیفیت.</p>
                        <div className="social-links">
                            <a href="#" aria-label="اینستاگرام"><i className="fab fa-instagram"></i></a>
                            <a href="#" aria-label="تلگرام"><i className="fab fa-telegram"></i></a>
                            <a href="#" aria-label="واتساپ"><i className="fab fa-whatsapp"></i></a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h3 className="footer-title">خدمات ما</h3>
                        <ul className="footer-links">
                            <li><Link to="/ServicesPage"><i className="fas fa-cut"></i> اصلاح سر</Link></li>
                            <li><Link to="/ServicesPage"><i className="fas fa-user"></i> آرایش صورت</Link></li>
                            <li><Link to="/ServicesPage"><i className="fas fa-palette"></i> ناخن زنی</Link></li>
                            <li><Link to="/ServicesPage"><i className="fas fa-soap"></i> مراقبت پوست</Link></li>
                            <li><Link to="/ServicesPage"><i className="fas fa-spa"></i> ماساژ صورت</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 className="footer-title">صفحات بیشتر</h3>
                        <ul className="footer-links">
                            <li><Link to="/privacy-policy"><i className="fas fa-user-secret"></i> حریم خصوصی</Link></li>
                            <li><Link to="/gallery"><i className="fas fa-images"></i> گالری</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2023 BARBER SHOP. تمامی حقوق محفوظ است. | طراحی شده با <i className="fas fa-heart"
                        style={{ color: 'var(--gold)' }}></i> برای آقایان</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;