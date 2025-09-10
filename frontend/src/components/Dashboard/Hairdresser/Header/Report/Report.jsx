// src/components/Dashboard/Hairdresser/Pages/Reports/Reports.jsx
import React, { useState } from 'react';
import './Report.css';

const HairdresserReportPage = () => {
    const [period, setPeriod] = useState('month'); // month, week, quarter

    // داده‌های نمونه — توی واقعی از API میان
    const stats = {
        revenue: 24500000,
        appointments: 120,
        avgTimePerAppointment: '45 دقیقه',
        canceled: 8,
        loyalClients: 23,
        topClient: 'محمدرضا احمدی'
    };

    const topServices = [
        { name: 'برش مو', count: 54, revenue: 11000000, color: '#f39c12' },
        { name: 'رنگ مو', count: 36, revenue: 8500000, color: '#27ae60' },
        { name: 'اصلاح ریش', count: 18, revenue: 3000000, color: '#3498db' },
        { name: 'نگهداری', count: 12, revenue: 2000000, color: '#8e44ad' }
    ];

    const formatNumber = (num) => {
        return num.toLocaleString('fa-IR');
    };

    return (
        <main className="hairdresser-reports-page">
            <div className="reports-header">
                <h1>گزارش‌های من</h1>
                <p>تحلیل درآمد، نوبت‌ها و عملکرد شما</p>
            </div>

            {/* فیلتر بازه زمانی */}
            <div className="report-filters">
                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="period-selector"
                >
                    <option value="week">هفته گذشته</option>
                    <option value="month">این ماه</option>
                    <option value="quarter">سه‌ماهه اخیر</option>
                </select>
            </div>

            {/* آمار کلی */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h2>{formatNumber(stats.revenue)} تومان</h2>
                    <p>درآمد {period === 'month' ? 'این ماه' : 'هفته گذشته'}</p>
                    <div className="trend">+12% نسبت به دوره قبل</div>
                </div>

                <div className="stat-card">
                    <h2>{stats.appointments}</h2>
                    <p>تعداد نوبت</p>
                    <div className="trend">+15% افزایش</div>
                </div>

                <div className="stat-card">
                    <h2>{stats.avgTimePerAppointment}</h2>
                    <p>میانگین زمان هر نوبت</p>
                </div>

                <div className="stat-card">
                    <h2>{stats.canceled}</h2>
                    <p>نوبت لغو شده</p>
                    <div className="trend warning">⚠️ نیاز به پیگیری</div>
                </div>
            </div>

            {/* خدمات پرفروش */}
            <div className="chart-section">
                <h3>خدمات پرفروش</h3>
                <div className="service-bars">
                    {topServices.map((service, index) => (
                        <div key={index} className="service-bar">
                            <div className="service-info">
                                <span className="service-name">{service.name}</span>
                                <span className="service-count">{service.count} نوبت</span>
                            </div>
                            <div className="bar-container">
                                <div
                                    className="bar-fill"
                                    style={{
                                        width: `${(service.count / topServices[0].count) * 100}%`,
                                        backgroundColor: service.color
                                    }}
                                ></div>
                            </div>
                            <div className="service-revenue">
                                {formatNumber(service.revenue)} تومان
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* مشتریان وفادار */}
            <div className="loyal-clients-section">
                <h3>مشتریان وفادار</h3>
                <div className="loyal-stats">
                    <div className="loyal-count">
                        <h4>{stats.loyalClients}</h4>
                        <p>مشتری وفادار</p>
                    </div>
                    <div className="top-client">
                        <h4>{stats.topClient}</h4>
                        <p>مشتری ماه</p>
                    </div>
                </div>
            </div>

            {/* دکمه خروجی */}
            <div className="report-actions">
                <button className="btn-export">
                    <i className="fas fa-file-pdf"></i> دریافت گزارش PDF
                </button>
            </div>
        </main>
    );
};

export default HairdresserReportPage;