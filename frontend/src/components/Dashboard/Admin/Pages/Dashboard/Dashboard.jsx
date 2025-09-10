// src/components/Dashboard/Admin/Pages/Dashboard/Dashboard.jsx
import React from 'react';
import './Dashboard.css';

const AdminDashboard = () => {
    return (
        <main className="admin-dashboard-page">
            <div className="dashboard-header">
                <h1>پنل مدیریت</h1>
                <p>آمار کلی، مدیریت کاربران، آرایشگران و نوبت‌ها</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <i className="fas fa-users stat-icon"></i>
                    <h3>کاربران</h3>
                    <p>1,248 نفر</p>
                    <div className="trend">+12% نسبت به ماه قبل</div>
                </div>
                <div className="stat-card">
                    <i className="fas fa-cut stat-icon"></i>
                    <h3>آرایشگران</h3>
                    <p>15 نفر</p>
                    <div className="trend">+2 جدید</div>
                </div>
                <div className="stat-card">
                    <i className="fas fa-calendar-check stat-icon"></i>
                    <h3>نوبت‌های امروز</h3>
                    <p>42 نوبت</p>
                    <div className="trend">+5 افزایش</div>
                </div>
                <div className="stat-card">
                    <i className="fas fa-coins stat-icon"></i>
                    <h3>درآمد کل</h3>
                    <p>32,450,000 تومان</p>
                    <div className="trend">+8% رشد</div>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;