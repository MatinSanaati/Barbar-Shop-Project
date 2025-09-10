// src/layouts/DefaultLayout.jsx
import React, { useState } from "react";
import "./Admin-Dashboard-Layout.css";
import Sidebar from "../../components/Dashboard/Admin/Sidebar/Sidebar";
import Header from "../../components/Dashboard/Admin/Header/Header";
import Content from "../../components/Dashboard/Admin/Contant/Content";
import Footer from "../../components/Dashboard/Admin/Footer/Footer";

const AdminDashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="dashboard">
            {/* سایدبار سمت راست */}
            <Sidebar isOpen={sidebarOpen} />

            {/* بخش اصلی: هدر + محتوا + فوتر */}
            <div className={`main-content ${sidebarOpen ? "sidebar-open" : ""}`}>
                <Header toggleSidebar={toggleSidebar} />
                <Content />
                <Footer />
            </div>
        </div>
    );
};

export default AdminDashboardLayout;
