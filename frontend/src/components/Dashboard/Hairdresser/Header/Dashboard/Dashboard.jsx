// src/components/Dashboard/Hairdresser/Pages/Dashboard/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const HairdresserDashboardPage = () => {
    // داده‌های نمونه
    const stats = {
        todayAppointments: 6,
        activeClients: 89,
        todayRevenue: 1850000,
        avgTimePerAppointment: '45 دقیقه',
        newNotification: 'نوبت جدید: محمدرضا احمدی - فردا 15:30'
    };

    return (
        <main className="hairdresser-dashboard-page">
            {/* هدر شخصی‌سازی شده */}
            <div className="dashboard-header">
                <h1>سلام، علی رضایی عزیز!</h1>
                <p>مدیریت مشتریان، برنامه کاری و درآمد شما</p>
            </div>

            {/* کارت‌های اصلی */}
            <div className="dashboard-grid">
                {/* نوبت‌های امروز */}
                <div className="card">
                    <i className="fas fa-calendar-day card-icon"></i>
                    <h3>نوبت‌های امروز</h3>
                    <p>{stats.todayAppointments} نوبت</p>
                    <Link to="/hairdresser/appointments" className="btn btn-primary">مشاهده</Link>
                    <div className="card-footer">
                        <small>میانگین زمان: {stats.avgTimePerAppointment}</small>
                    </div>
                </div>

                {/* مشتریان فعال */}
                <div className="card">
                    <i className="fas fa-users card-icon"></i>
                    <h3>مشتریان فعال</h3>
                    <p>{stats.activeClients} مشتری</p>
                    <Link to="/hairdresser/clients" className="btn btn-primary">مشاهده</Link>
                    <div className="card-footer">
                        <small>مشتری وفادار: 23 نفر</small>
                    </div>
                </div>

                {/* درآمد امروز */}
                <div className="card">
                    <i className="fas fa-wallet card-icon"></i>
                    <h3>درآمد امروز</h3>
                    <p>{stats.todayRevenue.toLocaleString('fa-IR')} تومان</p>
                    <Link to="/hairdresser/reports" className="btn btn-primary">گزارش</Link>
                    <div className="card-footer">
                        <small>روزانه میانگین: 1,920,000 تومان</small>
                    </div>
                </div>
            </div>

            {/* بخش اعلان‌ها */}
            <div className="dashboard-notifications">
                <h3><i className="fas fa-bell"></i> اعلان‌های فوری</h3>
                <ul className="notifications-list">
                    <li className="notification-item">
                        <i className="fas fa-calendar-check"></i>
                        {stats.newNotification}
                    </li>
                    <li className="notification-item warning">
                        <i className="fas fa-exclamation-triangle"></i>
                        برنامه کاری هفته آینده تنظیم نشده!
                    </li>
                    <li className="notification-item success">
                        <i className="fas fa-heart"></i>
                        مشتری وفادار: علی رضایی برای بار دهم اومد!
                    </li>
                </ul>
            </div>

            {/* نکته مهم */}
            <div className="dashboard-note">
                <i className="fas fa-info-circle"></i>
                تغییرات به صورت خودکار ذخیره میشن. از منوی سمت چپ صفحات دیگر رو مشاهده کنید.
            </div>
        </main>
    );
};

export default HairdresserDashboardPage;