import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ برای دکمه برگشت
import "./Profile.css";

const Profile = () => {
    const [userData, setUserData] = useState({
        fullName: "",
        phone: "",
        joined: "",
        avatar: "",
    });

    const [originalUserData, setOriginalUserData] = useState({
        fullName: "",
        phone: "",
    });

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users/me", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    const user = data.user;

                    const initialData = {
                        fullName: user.name || "کاربر",
                        phone: user.phone || "",
                        joined: new Date().toLocaleDateString("fa-IR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }),
                        avatar: "",
                    };

                    setUserData(initialData);
                    setOriginalUserData({
                        fullName: initialData.fullName,
                        phone: initialData.phone,
                    });
                }
            } catch (err) {
                console.error("خطا:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSave = async () => {
        const updates = {};
        if (userData.fullName !== originalUserData.fullName) {
            updates.name = userData.fullName;
        }
        if (userData.phone !== originalUserData.phone) {
            updates.phone = userData.phone;
        }

        if (Object.keys(updates).length === 0) {
            alert("هیچ تغییری اعمال نشد");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/users/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updates),
            });

            const result = await response.json();

            if (response.ok) {
                setOriginalUserData({
                    fullName: userData.fullName,
                    phone: userData.phone,
                });
                setEditMode(false);
                alert("اطلاعات با موفقیت بروزرسانی شد");
            } else {
                alert(result.error || "خطا در بروزرسانی");
            }
        } catch (err) {
            alert("خطا در ارتباط با سرور");
        }
    };

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserData({ ...userData, avatar: e.target.result });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    if (loading) {
        return <div className="profile-loader">در حال بارگذاری...</div>;
    }

    return (
        <div className="profile-page" dir="rtl">
            {/* 🔹 دکمه برگشت به داشبورد */}
            <Link to="/user" className="back-to-dashboard">
                <i className="fas fa-arrow-left"></i>
            </Link>

            {/* بخش هدر پروفایل */}
            <div className="profile-hero">
                <div className="avatar-container">
                    {userData.avatar ? (
                        <img src={userData.avatar} alt="آواتار" className="avatar-img" />
                    ) : (
                        <i className="fas fa-user-circle avatar-icon"></i>
                    )}
                    <label htmlFor="avatar-upload" className="avatar-edit-btn">
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
                <h1 className="profile-name">{userData.fullName}</h1>
                <p className="profile-joined">عضو از {userData.joined}</p>
            </div>

            {/* اطلاعات کاربر */}
            <div className="profile-details">
                <div className="detail-card">
                    <label>نام و نام خانوادگی</label>
                    {editMode ? (
                        <input
                            type="text"
                            name="fullName"
                            value={userData.fullName}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{userData.fullName}</span>
                    )}
                </div>

                <div className="detail-card">
                    <label>شماره موبایل</label>
                    {editMode ? (
                        <input
                            type="text"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                        />
                    ) : (
                        <span>{userData.phone}</span>
                    )}
                </div>
            </div>

            {/* دکمه‌ها */}
            <div className="profile-actions">
                {editMode ? (
                    <>
                        <button className="btn save" onClick={handleSave}>
                            <i className="fas fa-check"></i> ذخیره
                        </button>
                        <button className="btn cancel" onClick={() => setEditMode(false)}>
                            <i className="fas fa-times"></i> لغو
                        </button>
                    </>
                ) : (
                    <button className="btn edit" onClick={() => setEditMode(true)}>
                        <i className="fas fa-edit"></i> ویرایش اطلاعات
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;