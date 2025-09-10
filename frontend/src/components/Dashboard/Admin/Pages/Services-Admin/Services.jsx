// src/components/Dashboard/Admin/Pages/Services/Services.jsx
import React from 'react';
import './Services.css';

const ServicesAdmin = () => {
    const services = [
        { id: 1, name: 'برش مو', price: '800,000 تومان', duration: '45 دقیقه' },
        { id: 2, name: 'رنگ مو', price: '2,500,000 تومان', duration: '90 دقیقه' },
        { id: 3, name: 'اصلاح ریش', price: '400,000 تومان', duration: '20 دقیقه' }
    ];

    return (
        <main className="services-admin-page">
            <div className="page-header">
                <h1>مدیریت خدمات</h1>
                <p>تعریف و ویرایش خدمات ارائه‌شده</p>
            </div>

            <div className="services-grid">
                {services.map(service => (
                    <div key={service.id} className="service-card">
                        <h3>{service.name}</h3>
                        <div className="service-info">
                            <span><i className="fas fa-coins"></i> {service.price}</span>
                            <span><i className="fas fa-clock"></i> {service.duration}</span>
                        </div>
                        <div className="service-actions">
                            <button className="btn btn-edit">ویرایش</button>
                            <button className="btn btn-delete">حذف</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ServicesAdmin;