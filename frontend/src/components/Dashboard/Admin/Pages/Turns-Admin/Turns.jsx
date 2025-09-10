// src/components/Dashboard/Admin/Pages/Appointments/Appointments.jsx
import React from 'react';
import './Turns.css';

const TurnsAdmin = () => {
    const appointments = [
        { id: 1, user: 'علی رضایی', barber: 'رضا محمدی', service: 'برش مو', date: '1403/08/15', time: '14:30', status: 'تکمیل شده' },
        { id: 2, user: 'محمد احمدی', barber: 'علی رضایی', service: 'رنگ مو', date: '1403/08/15', time: '16:00', status: 'در انتظار' },
        { id: 3, user: 'سید حسینی', barber: 'رضا محمدی', service: 'اصلاح ریش', date: '1403/08/16', time: '10:00', status: 'لغو شده' }
    ];

    return (
        <main className="appointments-admin-page">
            <div className="page-header">
                <h1>مدیریت نوبت‌ها</h1>
                <p>مشاهده و مدیریت تمام نوبت‌های ثبت‌شده</p>
            </div>

            <div className="appointments-table-container">
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>مشتری</th>
                            <th>آرایشگر</th>
                            <th>خدمت</th>
                            <th>تاریخ</th>
                            <th>ساعت</th>
                            <th>وضعیت</th>
                            <th>اقدامات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appt => (
                            <tr key={appt.id}>
                                <td>{appt.id}</td>
                                <td>{appt.user}</td>
                                <td>{appt.barber}</td>
                                <td>{appt.service}</td>
                                <td>{appt.date}</td>
                                <td>{appt.time}</td>
                                <td><span className={`status-badge ${appt.status}`}>{appt.status}</span></td>
                                <td>
                                    <button className="btn btn-edit">ویرایش</button>
                                    <button className="btn btn-delete">حذف</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default TurnsAdmin;