// src/components/Dashboard/Admin/Pages/Users/Users.jsx
import React from 'react';
import './User-Management.css';

const UsersManagement = () => {
    const users = [
        { id: 1, name: 'علی رضایی', phone: '0912 345 6789', role: 'کاربر', status: 'فعال' },
        { id: 2, name: 'محمد احمدی', phone: '0935 123 4567', role: 'آرایشگر', status: 'غیرفعال' },
        { id: 3, name: 'سید حسینی', phone: '0912 987 6543', role: 'کاربر', status: 'فعال' }
    ];

    return (
        <main className="users-management-page">
            <div className="page-header">
                <h1>مدیریت کاربران</h1>
                <p>لیست تمام کاربران سیستم</p>
            </div>

            <div className="users-table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>نام</th>
                            <th>شماره تماس</th>
                            <th>نقش</th>
                            <th>وضعیت</th>
                            <th>اقدامات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td><span className={`badge role-${user.role}`}>{user.role}</span></td>
                                <td><span className={`badge status-${user.status}`}>{user.status}</span></td>
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

export default UsersManagement;