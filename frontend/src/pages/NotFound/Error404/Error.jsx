import React, { useEffect } from 'react';
import './Error.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    useEffect(() => {
        // Shake animation on load
        const errorCode = document.querySelector('.error-code');
        if (errorCode) {
            setTimeout(() => {
                errorCode.classList.add('shake');
            }, 500);
        }
    }, []);

    return (
        <div>
            {/* Error Section */}
            <section className="error-section">
                <div className="error-container">
                    <div className="error-content">
                        <div className="error-code shake">404</div>
                        <h1 className="error-title">صفحه یافت نشد!</h1>
                        <p className="error-message">متاسفانه صفحه‌ای که به دنبال آن بودید یافت نشد. ممکن است آدرس را اشتباه وارد کرده باشید یا صفحه به آدرس جدیدی منتقل شده باشد.</p>
                        <div className="error-actions">
                            <Link to='/' className="btn btn-primary"><i className="fas fa-home"></i> بازگشت به خانه</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="footer-content">
                    <div className="logo-footer">
                        <i className="fas fa-cut"></i>
                        <span>BARBER SHOP</span>
                    </div>
                    <div className="copyright">
                        <p>&copy; 2023 BARBER SHOP. تمامی حقوق محفوظ است. | طراحی شده با <i className="fas fa-heart"
                            style={{ color: 'var(--gold)' }}></i> برای آقایان</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ErrorPage;