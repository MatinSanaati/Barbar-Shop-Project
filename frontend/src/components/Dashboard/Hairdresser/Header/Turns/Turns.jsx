// src/components/Dashboard/Hairdresser/Pages/Appointments/Appointments.jsx
import React from 'react';
import './Turns.css';

// داده‌های نمونه — توی واقعی این‌ها از API میان
const appointments = [
    {
        id: 1,
        user: {
            name: 'محمدرضا احمدی',
            phone: '0912 345 6789',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        service: 'برش مو',
        date: '1403/08/15',
        time: '14:30',
        status: 'pending', // pending, confirmed, completed, canceled
        note: 'مدل جدید می‌خوام'
    },
    {
        id: 2,
        user: {
            name: 'علی رضایی',
            phone: '0935 123 4567',
            avatar: null // آواتار نداره
        },
        service: 'رنگ مو',
        date: '1403/08/16',
        time: '10:00',
        status: 'confirmed',
        note: ''
    },
    {
        id: 3,
        user: {
            name: 'سید محمد حسینی',
            phone: '0912 987 6543',
            avatar: 'https://randomuser.me/api/portraits/men/44.jpg'
        },
        service: 'اصلاح ریش',
        date: '1403/08/16',
        time: '16:15',
        status: 'completed',
        note: 'تمام شد، عکس گرفته شد'
    }
];

const getStatusText = (status) => {
    const map = {
        pending: 'در انتظار تأیید',
        confirmed: 'تأیید شده',
        completed: 'انجام شده',
        canceled: 'لغو شده'
    };
    return map[status] || 'ناشناخته';
};

const getStatusColor = (status) => {
    const map = {
        pending: '#f39c12',
        confirmed: '#27ae60',
        completed: '#3498db',
        canceled: '#e74c3c'
    };
    return map[status] || '#95a5a6';
};

const HairdresserTurnsPage = () => {
    return (
        <main className="hairdresser-appointments-page">
            <div className="appointments-header">
                <h1>نوبت‌های من</h1>
                <p>مدیریت نوبت‌های امروز و آینده</p>
            </div>

            <div className="appointments-list">
                {appointments.length === 0 ? (
                    <div className="empty-state">
                        <i className="fas fa-calendar-check"></i>
                        <p>هیچ نوبتی یافت نشد</p>
                    </div>
                ) : (
                    appointments.map((appt) => (
                        <div key={appt.id} className="appointment-card">
                            {/* اطلاعات مشتری */}
                            <div className="client-section">
                                <div className="client-avatar">
                                    {appt.user.avatar ? (
                                        <img src={appt.user.avatar} alt={appt.user.name} />
                                    ) : (
                                        <i className="fas fa-user"></i>
                                    )}
                                </div>
                                <div className="client-details">
                                    <h3>{appt.user.name}</h3>
                                    <p className="client-phone">
                                        <i className="fas fa-phone"></i> {appt.user.phone}
                                    </p>
                                </div>
                            </div>

                            {/* اطلاعات نوبت */}
                            <div className="appointment-details">
                                <div className="detail-item">
                                    <i className="fas fa-concierge-bell"></i>
                                    <span>{appt.service}</span>
                                </div>
                                <div className="detail-item">
                                    <i className="far fa-calendar-alt"></i>
                                    <span>{appt.date}</span>
                                </div>
                                <div className="detail-item">
                                    <i className="far fa-clock"></i>
                                    <span>{appt.time}</span>
                                </div>
                                {appt.note && (
                                    <div className="detail-item note">
                                        <i className="fas fa-sticky-note"></i>
                                        <span>{appt.note}</span>
                                    </div>
                                )}
                            </div>

                            {/* وضعیت و دکمه‌ها */}
                            <div className="appointment-actions">
                                <span
                                    className="status-badge"
                                    style={{ backgroundColor: `${getStatusColor(appt.status)}20`, color: getStatusColor(appt.status) }}
                                >
                                    {getStatusText(appt.status)}
                                </span>
                                <div className="action-buttons">
                                    {appt.status === 'pending' && (
                                        <>
                                            <button className="btn btn-confirm">
                                                <i className="fas fa-check"></i> تأیید
                                            </button>
                                            <button className="btn btn-cancel">
                                                <i className="fas fa-times"></i> رد
                                            </button>
                                        </>
                                    )}
                                    <button className="btn btn-contact">
                                        <i className="fas fa-phone"></i> تماس
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};

export default HairdresserTurnsPage;