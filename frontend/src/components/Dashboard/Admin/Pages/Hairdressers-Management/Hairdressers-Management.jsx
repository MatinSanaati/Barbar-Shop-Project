// src/components/Dashboard/Admin/Pages/Barbers/Barbers.jsx
import React from 'react';
import './Hairdressers-Management.css';

const HairdressersManagement = () => {
    const barbers = [
        { id: 1, name: 'رضا محمدی', phone: '0912 345 6789', turns: 120, rating: '4.9' },
        { id: 2, name: 'علی رضایی', phone: '0935 123 4567', turns: 89, rating: '4.7' }
    ];

    return (
        <main className="barbers-management-page">
            <div className="page-header">
                <h1>مدیریت آرایشگران</h1>
                <p>لیست تمام آرایشگران فعال</p>
            </div>

            <div className="barbers-table-container">
                <table className="barbers-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>نام</th>
                            <th>شماره تماس</th>
                            <th>تعداد نوبت</th>
                            <th>میانگین امتیاز</th>
                            <th>اقدامات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {barbers.map(barber => (
                            <tr key={barber.id}>
                                <td>{barber.id}</td>
                                <td>{barber.name}</td>
                                <td>{barber.phone}</td>
                                <td>{barber.turns}</td>
                                <td>⭐ {barber.rating}</td>
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

export default HairdressersManagement;