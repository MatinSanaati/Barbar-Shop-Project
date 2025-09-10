// src/components/Admin/MainAdmin.jsx
import React from 'react';
import './Main.css';
import StatCard from '../StatCard/StatCard';

const Main = () => {
    return (
        <main className="main-admin">
            {/* هدر داشبورد */}
            <div className="main-admin-header">
                <h1>پنل مدیریت</h1>
                <p>آمار کلی، مدیریت کاربران، آرایشگران و نوبت‌ها</p>
            </div>

            {/* گرید کارت‌ها */}
            <div className="main-admin-grid">
                <StatCard
                    icon="fas fa-users"
                    title="کاربران"
                    value="1,248 نفر"
                    link="/admin/users"
                    linkText="مدیریت"
                />
                <StatCard
                    icon="fas fa-cut"
                    title="آرایشگران"
                    value="15 نفر"
                    link="/admin/barbers"
                    linkText="مدیریت"
                />
                <StatCard
                    icon="fas fa-calendar-check"
                    title="نوبت‌های امروز"
                    value="42 نوبت"
                    link="/admin/appointments"
                    linkText="مشاهده"
                />
                <StatCard
                    icon="fas fa-coins"
                    title="درآمد کل"
                    value="32,450,000 تومان"
                    link="/admin/reports"
                    linkText="گزارش"
                />
            </div>
        </main>
    );
};

export default Main;