// src/components/Dashboard/Admin/Pages/Settings/Settings.jsx
import React from 'react';
import './Settings.css';

const SettingsAdmin = () => {
    return (
        <main className="settings-admin-page">
            <div className="page-header">
                <h1>تنظیمات سیستم</h1>
                <p>مدیریت تنظیمات عمومی، تم، امنیت و اعلانات</p>
            </div>

            <div className="settings-form">
                <div className="form-group">
                    <label>عنوان سایت</label>
                    <input type="text" defaultValue="آرایشگاه علی رضایی" />
                </div>
                <div className="form-group">
                    <label>شماره تماس</label>
                    <input type="text" defaultValue="0912 345 6789" />
                </div>
                <div className="form-group">
                    <label>آدرس</label>
                    <textarea defaultValue="تهران، خیابان ولیعصر، پلاک ۱۲۳"></textarea>
                </div>
                <div className="form-actions">
                    <button className="btn btn-save">ذخیره تغییرات</button>
                </div>
            </div>
        </main>
    );
};

export default SettingsAdmin;