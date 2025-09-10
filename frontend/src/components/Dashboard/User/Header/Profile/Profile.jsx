import React, { useState, useEffect } from "react";
import "./Profile.css";

const UserProfile = () => {
    const [userData, setUserData] = useState({
        fullName: "",
        phone: "",
        joined: "",
        avatar: "",
    });

    // ✅ ذخیره اطلاعات اولیه برای مقایسه
    const [originalUserData, setOriginalUserData] = useState({
        fullName: "",
        phone: "",
    });

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    // بارگذاری اطلاعات کاربر
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

                    // ✅ ذخیره نسخه اولیه برای مقایسه بعدی
                    setOriginalUserData({
                        fullName: initialData.fullName,
                        phone: initialData.phone,
                    });
                }
            } catch (err) {
                console.error("خطا در ارتباط با سرور:", err);
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
        // 🔍 مقایسه با نسخه اولیه
        const updates = {};
        if (userData.fullName !== originalUserData.fullName) {
            updates.name = userData.fullName;
        }
        if (userData.phone !== originalUserData.phone) {
            updates.phone = userData.phone;
        }

        // اگه هیچی تغییر نکرده، ذخیره نکن
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
                // ✅ به‌روزرسانی نسخه اولیه بعد از موفقیت
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
        return (
            <div className="user-profile-container">
                <div className="loader">در حال بارگذاری...</div>
            </div>
        );
    }

    return (
        <div className="user-profile-container">
            <div className="user-profile-card">
                {/* آواتار */}
                <div className="avatar-section">
                    <div className="avatar-wrapper">
                        {userData.avatar ? (
                            <img src={userData.avatar} alt="Avatar" className="avatar-img" />
                        ) : (
                            <i className="fas fa-user-circle avatar-icon"></i>
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
                    <h2 className="user-name">{userData.fullName}</h2>
                    <p className="join-date">عضو شده از {userData.joined}</p>
                </div>

                {/* اطلاعات کاربر */}
                <div className="profile-fields">
                    <div className="field">
                        <label>نام و نام خانوادگی:</label>
                        <div className="field-wrapper">
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
                            <i
                                className="fas fa-edit edit-icon"
                                onClick={() => setEditMode(true)}
                            ></i>
                        </div>
                    </div>

                    <div className="field">
                        <label>شماره موبایل:</label>
                        <div className="field-wrapper">
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
                            <i
                                className="fas fa-edit edit-icon"
                                onClick={() => setEditMode(true)}
                            ></i>
                        </div>
                    </div>
                </div>

                {/* دکمه‌ها */}
                <div className="profile-actions">
                    {editMode ? (
                        <>
                            <button className="btn save" onClick={handleSave}>
                                <i className="fas fa-check"></i> ذخیره
                            </button>
                            <button
                                className="btn cancel"
                                onClick={() => setEditMode(false)}
                            >
                                <i className="fas fa-times"></i> انصراف
                            </button>
                        </>
                    ) : (
                        <button className="btn edit" onClick={() => setEditMode(true)}>
                            <i className="fas fa-edit"></i> ویرایش پروفایل
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;