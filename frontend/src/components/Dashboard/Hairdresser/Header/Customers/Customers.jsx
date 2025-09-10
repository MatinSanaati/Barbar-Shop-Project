// src/components/Dashboard/Hairdresser/Pages/Clients/Clients.jsx
import React from 'react';
import './Customers.css';

const HairdresserCustomersPage = () => {
    const clients = [
        {
            id: 1,
            name: 'رضا محمدی',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            lastVisit: '3 روز پیش',
            totalVisits: 12,
            favoriteService: 'برش مو',
            phone: '0912 345 6789',
            note: 'مدل جدید دوست داره'
        },
        {
            id: 2,
            name: 'علی رضایی',
            avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
            lastVisit: '1 هفته پیش',
            totalVisits: 8,
            favoriteService: 'رنگ مو',
            phone: '0935 123 4567',
            note: 'هر 3 هفته یه بار میاد'
        },
        {
            id: 3,
            name: 'سید محمد حسینی',
            avatar: null,
            lastVisit: '2 روز پیش',
            totalVisits: 5,
            favoriteService: 'اصلاح ریش',
            phone: '0912 987 6543',
            note: ''
        }
    ];

    return (
        <main className="hairdresser-clients-page">
            <div className="clients-header">
                <h1>مشتریان من</h1>
                <p>مدیریت مشتریان وفادار و تاریخچه خدمات</p>
            </div>

            <div className="clients-grid">
                {clients.map(client => (
                    <div key={client.id} className="client-card">
                        {/* آواتار */}
                        <div className="client-avatar">
                            {client.avatar ? (
                                <img src={client.avatar} alt={client.name} />
                            ) : (
                                <i className="fas fa-user"></i>
                            )}
                        </div>

                        {/* اطلاعات */}
                        <h3>{client.name}</h3>
                        <p className="client-meta">
                            <i className="far fa-calendar"></i> آخرین بازدید: {client.lastVisit}
                        </p>
                        <p className="client-meta">
                            <i className="fas fa-cut"></i> تعداد بازدید: {client.totalVisits}
                        </p>
                        <p className="client-service">
                            🔹 {client.favoriteService}
                        </p>

                        {/* یادداشت */}
                        {client.note && (
                            <p className="client-note">
                                <i className="fas fa-sticky-note"></i> {client.note}
                            </p>
                        )}

                        {/* دکمه‌ها */}
                        <div className="client-actions">
                            <button className="btn btn-contact">
                                <i className="fas fa-phone"></i> تماس
                            </button>
                            <button className="btn btn-appointment">
                                <i className="fas fa-calendar-plus"></i> نوبت
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default HairdresserCustomersPage;