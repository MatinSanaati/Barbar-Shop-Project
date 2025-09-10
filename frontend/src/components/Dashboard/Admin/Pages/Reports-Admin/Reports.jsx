// src/components/Dashboard/Admin/Pages/Reports/Reports.jsx
import React from 'react';
import './Reports.css';

const ReportsAdmin = () => {
    return (
        <main className="reports-admin-page">
            <div className="page-header">
                <h1>گزارش‌های سیستم</h1>
                <p>آمار کلی، درآمد، نوبت‌ها و فعالیت کاربران</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>درآمد کل</h3>
                    <p className="value">32,450,000 تومان</p>
                    <p className="trend">+8% نسبت به ماه قبل</p>
                </div>
                <div className="stat-card">
                    <h3>تعداد نوبت</h3>
                    <p className="value">1,240 نوبت</p>
                    <p className="trend">+15% افزایش</p>
                </div>
                <div className="stat-card">
                    <h3>کاربران جدید</h3>
                    <p className="value">124 نفر</p>
                    <p className="trend">+12% رشد</p>
                </div>
                <div className="stat-card">
                    <h3>آرایشگران فعال</h3>
                    <p className="value">15 نفر</p>
                    <p className="trend">همه فعال</p>
                </div>
            </div>
        </main>
    );
};

export default ReportsAdmin;