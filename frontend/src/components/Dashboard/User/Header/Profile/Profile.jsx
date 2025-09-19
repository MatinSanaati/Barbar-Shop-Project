import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const navigate = useNavigate();

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

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
                    method: "GET",
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
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

    // تغییر فیلدها
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // ذخیره تغییرات
    const handleSave = async () => {
        const updates = {};
        if (userData.fullName !== originalUserData.fullName) updates.name = userData.fullName;
        if (userData.phone !== originalUserData.phone) updates.phone = userData.phone;

        if (!Object.keys(updates).length) return alert("هیچ تغییری اعمال نشد");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/update`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updates),
            });
            const result = await res.json();
            if (res.ok) {
                setOriginalUserData({ fullName: userData.fullName, phone: userData.phone });
                setEditMode(false);
                alert("اطلاعات با موفقیت بروزرسانی شد");
            } else {
                alert(result.error || "خطا در بروزرسانی");
            }
        } catch (err) {
            alert("خطا در ارتباط با سرور");
        }
    };

    // تغییر آواتار
    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => setUserData({ ...userData, avatar: e.target.result });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // خروج
    const handleLogout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) navigate("/");
        } catch (err) {
            console.error(err);
            alert("خطا در خروج از حساب");
        }
    };

    if (loading) return <div className="profile-loader">در حال بارگذاری...</div>;

    return (
        <div className="profile-page" dir="rtl">
            {/* دکمه برگشت */}
            <Link to="/user" className="back-to-dashboard">
                <i className="fas fa-arrow-left"></i>
            </Link>

            {/* هدر و اطلاعات کاربر */}
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

            {/* تنظیمات و اطلاعات کاربر */}
            <div className="profile-details">
                <div className="detail-card">
                    <label>نام و نام خانوادگی</label>
                    {editMode ? (
                        <input type="text" name="name" value={userData.fullName} onChange={handleChange} />
                    ) : (
                        <span>{userData.fullName}</span>
                    )}
                </div>
                <div className="detail-card">
                    <label>شماره موبایل</label>
                    {editMode ? (
                        <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
                    ) : (
                        <span>{userData.phone}</span>
                    )}
                </div>
            </div>

            {/* عملیات */}
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
                    <>
                        <button className="btn edit" onClick={() => setEditMode(true)}>
                            <i className="fas fa-edit"></i> ویرایش اطلاعات
                        </button>
                        <button className="btn logout" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> خروج از حساب
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;