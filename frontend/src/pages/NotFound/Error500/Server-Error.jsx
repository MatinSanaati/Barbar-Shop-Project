import React, { useEffect, useState } from 'react';
import './Server-Error.css';

const ServerErrorPage = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate progress bar animation
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {/* Error Section */}
            <section className="error-section">
                <div className="error-container">
                    <div className="error-content">
                        <div className="error-code shake">500</div>
                        <h1 className="error-title">خطای داخلی سرور!</h1>
                        <p className="error-message">متاسفانه خطایی در سرور رخ داده است. تیم فنی ما در حال بررسی و رفع مشکل هستند. لطفاً چند دقیقه دیگر مجدداً تلاش کنید.</p>

                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${progress}% ` }}></div>
                        </div>

                        <div className="error-actions">
                            <a href="/Landing/index.html" className="btn btn-primary"><i className="fas fa-home"></i> بازگشت به خانه</a>
                        </div>

                        <div className="support-info">
                            <p>اگر مشکل ادامه داشت، با شماره <strong>021-12345678</strong> تماس بگیرید</p>
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

export default ServerErrorPage;