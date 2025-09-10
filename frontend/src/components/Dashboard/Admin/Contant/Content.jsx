// src/components/Content.jsx
import React from "react";
import { Outlet } from "react-router-dom"; // مهم برای رندر صفحات
import "./Content.css";

const Content = () => {
    return (
        <div className="content">
            {/* Outlet جای تمام صفحات فولدر pages رو میگیره */}
            <Outlet />
        </div>
    );
};

export default Content;
