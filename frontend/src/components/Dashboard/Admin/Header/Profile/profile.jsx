// src/components/Admin/ProfileAdmin.jsx
import React, { useState } from "react";
import './Profile.css';

const AdminProfile = () => {
    const [adminData, setAdminData] = useState({
        name: "علی رضایی",
        email: "admin@example.com",
        phone: "0912-987-6543",
        role: "ادمین کل سامانه",
        avatar: "",
        userCount: 120,
        barberCount: 25,
    });

    const [editMode, setEditMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => setAdminData({ ...adminData, avatar: e.target.result });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSave = () => {
        setEditMode(false);
        console.log("ذخیره شد:", adminData);
    };

    return (
        <div className="admin-profile-container">
            <div className="admin-profile-card">
                <div className="admin-avatar-section">
                    <div className="avatar-wrapper">
                        {adminData.avatar ? (
                            <img src={adminData.avatar} alt="آواتار" className="avatar-img" />
                        ) : (
                            <i className="fas fa-user-shield avatar-icon"></i>
                        )}
                        <label htmlFor="avatar-upload" className="avatar-upload">
                            <i className="fas fa-camera"></i>
                        </label>
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            style={{ display: "none" }}
                        />
                    </div>
                    <h2 className="admin-name">{adminData.name}</h2>
                    <p className="admin-role">{adminData.role}</p>
                </div>

                <div className="admin-info">
                    <div className="info-item">
                        <i className="fas fa-envelope"></i>
                        {editMode ? (
                            <input type="email" name="email" value={adminData.email} onChange={handleChange} />
                        ) : (
                            <span>{adminData.email}</span>
                        )}
                        <i className="fas fa-edit edit-icon" onClick={() => setEditMode(true)}></i>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-phone"></i>
                        {editMode ? (
                            <input type="text" name="phone" value={adminData.phone} onChange={handleChange} />
                        ) : (
                            <span>{adminData.phone}</span>
                        )}
                        <i className="fas fa-edit edit-icon" onClick={() => setEditMode(true)}></i>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-users"></i>
                        <span>مدیریت {adminData.userCount} کاربر و {adminData.barberCount} آرایشگر</span>
                    </div>
                </div>

                <div className="profile-actions">
                    {editMode ? (
                        <>
                            <button className="btn save" onClick={handleSave}>
                                <i className="fas fa-check"></i> ذخیره
                            </button>
                            <button className="btn cancel" onClick={() => setEditMode(false)}>
                                <i className="fas fa-times"></i> انصراف
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn edit">
                                <i className="fas fa-edit"></i> ویرایش پروفایل
                            </button>
                            <button className="btn password">
                                <i className="fas fa-key"></i> تغییر رمز
                            </button>
                            <button className="btn logout">
                                <i className="fas fa-sign-out-alt"></i> خروج
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;