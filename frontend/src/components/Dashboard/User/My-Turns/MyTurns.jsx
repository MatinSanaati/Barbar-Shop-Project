// src/components/Dashboard/User/My-Turns/My-Turns.jsx
import React, { useState, useEffect } from 'react';
import './MyTurns.css';
import Header from '../../User/Header/Header';
import Footer from '../../User/Footer/Footer';

const MyTurns = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔹 دریافت نوبت‌ها از سرور
    useEffect(() => {
        fetch("http://localhost:5000/api/appointments/me", {
            method: "GET",
            credentials: "include"
        })
            .then(res => {
                if (!res.ok) throw new Error("عدم دسترسی به داده");
                return res.json();
            })
            .then(data => setAppointments(data.appointments || []))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="booking-page" dir="rtl">
            {/* 🔝 هدر */}
            <Header />

            {/* 🧱 بخش اصلی */}
            <main className="booking-main">
                <section className="booking-section">
                    <div className="booking-container">
                        <h2 className="title">نوبت‌های من</h2>
                        <div className="underline"></div>

                        {/* بارگذاری */}
                        {loading && (
                            <div className="loader">
                                در حال بارگذاری نوبت‌ها...
                            </div>
                        )}

                        {/* خطا */}
                        {error && (
                            <div className="error-message">
                                ❌ {error}
                            </div>
                        )}

                        {/* لیست خالی */}
                        {!loading && !error && appointments.length === 0 && (
                            <div className="empty-state">
                                شما هنوز نوبتی نگرفته‌اید.
                            </div>
                        )}

                        {/* لیست نوبت‌ها */}
                        {!loading && !error && appointments.length > 0 && (
                            <ul className="appointments-list">
                                {appointments.map(app => (
                                    <li key={app.id} className="appointment-item">
                                        <div className="icon">💇‍♂️</div>
                                        <div className="info">
                                            <h3>{app.service}</h3>
                                            <p><strong>تاریخ:</strong> {app.date}</p>
                                            <p><strong>ساعت:</strong> {app.time}</p>
                                            {app.created_at && (
                                                <small className="created-at">ثبت شده در: {app.created_at}</small>
                                            )}
                                        </div>
                                        <span className={`status ${app.status}`}>
                                            {app.status === 'pending' && 'در انتظار'}
                                            {app.status === 'confirmed' && 'تایید شده'}
                                            {app.status === 'canceled' && 'لغو شده'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            </main>

            {/* 🔝 فوتر */}
            <Footer />
        </div>
    );
};

export default MyTurns;