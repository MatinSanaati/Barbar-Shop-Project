import React, { useState, useEffect } from "react";
import "./Admin-Dashboard-Layout.css";

// ✅ اصلاح مسیر ایمپورت (با فرض اینکه پوشه درست `Content` باشه)
import Sidebar from "../../components/Dashboard/Admin/Sidebar/Sidebar";
import Header from "../../components/Dashboard/Admin/Header/Header";
import Content from "../../components/Dashboard/Admin/Contant/Content";
import Footer from "../../components/Dashboard/Admin/Footer/Footer";

// 🔍 دیباگ: بررسی ایمپورت
if (!Sidebar) console.error("❌ Sidebar کامپوننت یافت نشد");
if (!Header) console.error("❌ Header کامپوننت یافت نشد");
if (!Content) console.error("❌ Content کامپوننت یافت نشد");
if (!Footer) console.error("❌ Footer کامپوننت یافت نشد");

const AdminDashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    // ✅ بررسی وجود تمام کامپوننت‌ها قبل از رندر
    useEffect(() => {
        if (Sidebar && Header && Content && Footer) {
            setLoading(false);
        } else {
            console.error("یک یا چند کامپوننت اصلی یافت نشد");
        }
    }, []);

    if (loading) {
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1a1a1a',
                color: 'white',
                fontSize: '18px'
            }}>
                در حال بارگذاری کامپوننت‌ها...
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* سایدبار */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar isOpen={sidebarOpen} />
            </aside>

            {/* بخش اصلی با Grid */}
            <main className="main-layout">
                {/* هدر */}
                <header className="main-header">
                    <Header toggleSidebar={() => setSidebarOpen(prev => !prev)} />
                </header>

                {/* محتوای اصلی */}
                <section className="main-content">
                    <Content />
                </section>

                {/* فوتر */}
                <footer className="main-footer">
                    <Footer />
                </footer>
            </main>
        </div>
    );
};

export default AdminDashboardLayout;