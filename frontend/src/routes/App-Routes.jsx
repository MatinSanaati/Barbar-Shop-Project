import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// لندینگ
import LandingPage from "../pages/Landing/Landing";
import ErrorPage from "../pages/NotFound/Error404/Error";
import ServerErrorPage from "../pages/NotFound/Error500/Server-Error";
import ServicesPage from "../pages/Services/Services";
import AboutPage from "../pages/About/About";
import TakingturnsPage from "../pages/Taking-Turns/Taking-Turns";
import ContactPage from "../pages/Contact/Contact";
import BlogPage from "../pages/Blog/Blog";
import HelpPage from "../pages/Help/Help";
import GalleryPage from "../pages/Gallary/Gallary";
import PrivacyPolicyPage from "../pages/Privacy-Policy/Privacy-Policy";

// داشبورد کاربر
import UserDashboardLayout from "../layouts/User/User-Dashboard-Layout";
import UserProfile from "../components/Dashboard/User/Header/Profile/Profile";
import UserServicesPage from "../components/Dashboard/User/Header/Services/Services";
import UserAboutPage from "../components/Dashboard/User/Header/About/About";
import UserTakingturnsPage from "../components/Dashboard/User/Header/Taking-Turns/Taking-Turns";
import UserContactPage from "../components/Dashboard/User/Header/Contact/Contact";
import UserBlogPage from "../components/Dashboard/User/Header/Blog/Blog";
import UserHelpPage from "../components/Dashboard/User/Header/Help/Help";
import UserGalleryPage from "../components/Dashboard/User/Footer/Gallery/Gallery";
import UserPrivacyPolicyPage from "../components/Dashboard/User/Footer/Privacy-Policy/Privacy-Policy";

// داشبورد ادمین
import AdminDashboardLayout from "../layouts/Admin/Admin-Dashboard-Layout";
import AdminProfile from "../components/Dashboard/Admin/Header/Profile/profile";
import AdminDashboard from '../components/Dashboard/Admin/Pages/Dashboard/Dashboard';
import AdminUserManagment from '../components/Dashboard/Admin/Pages/User-Management/User-Management';
import AdminHairdressersManagement from '../components/Dashboard/Admin/Pages/Hairdressers-Management/Hairdressers-Management';
import AdminTurns from '../components/Dashboard/Admin/Pages/Turns-Admin/Turns';
import AdminServices from '../components/Dashboard/Admin/Pages/Services-Admin/Services';
import AdminReports from '../components/Dashboard/Admin/Pages/Reports-Admin/Reports';
import AdminSettings from '../components/Dashboard/Admin/Pages/Settings-Admin/Settings';

// داشبورد آرایشگر
import HairdresserDashboardLayout from "../layouts/Hairdresser/Hairdresser-Dashboard-Layout";
import HairdresserProfile from "../components/Dashboard/Hairdresser/Header/Profile/Profile";
import HairdresserDashboard from "../components/Dashboard/Hairdresser/Header/Dashboard/Dashboard";
import HairdresserWorkPlan from "../components/Dashboard/Hairdresser/Header/Work-Plan/Work-Plan";
import HairdresserTurnsPage from "../components/Dashboard/Hairdresser/Header/Turns/Turns";
import HairdresserCustomersPage from "../components/Dashboard/Hairdresser/Header/Customers/Customers";
import HairdresserReport from "../components/Dashboard/Hairdresser/Header/Report/Report";

// صفحه احراز هویت
import AuthLayoutPage from "../auth/Auth-Layouts";

const AppRoutes = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/users/me", {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(data => setUser(data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>در حال بارگذاری...</div>;
    }

    return (
        <Routes>
            {/* ====================== */}
            {/* === صفحات لندینگ === */}
            {/* ====================== */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/taking-turns" element={<TakingturnsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

            {/* ======================== */}
            {/* === صفحه احراز هویت === */}
            {/* ======================== */}
            <Route path="/auth-layout" element={<AuthLayoutPage />} />

            {/* ======================== */}
            {/* === داشبورد کاربر === */}
            {/* ======================== */}
            {user && user.role === 'user' && (
                <Route path="/user/*" element={<UserDashboardLayout />}>
                    <Route index element={<UserServicesPage />} />
                    <Route path="services/*" element={<UserServicesPage />} />
                    <Route path="profile/*" element={<UserProfile />} />
                    <Route path="about/*" element={<UserAboutPage />} />
                    <Route path="taking-turns/*" element={<UserTakingturnsPage />} />
                    <Route path="contact/*" element={<UserContactPage />} />
                    <Route path="blog/*" element={<UserBlogPage />} />
                    <Route path="help/*" element={<UserHelpPage />} />
                    <Route path="gallery/*" element={<UserGalleryPage />} />
                    <Route path="privacy-policy/*" element={<UserPrivacyPolicyPage />} />
                </Route>
            )}

            {/* ======================== */}
            {/* === داشبورد ادمین === */}
            {/* ======================== */}
            {user && user.role === 'admin' && (
                <Route path="/admin/*" element={<AdminDashboardLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard/*" element={<AdminDashboard />} />
                    <Route path="profile/*" element={<AdminProfile />} />
                    <Route path="admin-managment/*" element={<AdminUserManagment />} />
                    <Route path="hairdressers/*" element={<AdminHairdressersManagement />} />
                    <Route path="turns/*" element={<AdminTurns />} />
                    <Route path="servisec/*" element={<AdminServices />} />
                    <Route path="reports/*" element={<AdminReports />} />
                    <Route path="settings/*" element={<AdminSettings />} />
                </Route>
            )}

            {/* ============================= */}
            {/* === داشبورد آرایشگر === */}
            {/* ============================= */}
            {user && user.role === 'hairdresser' && (
                <Route path="/hairdresser/*" element={<HairdresserDashboardLayout />}>
                    <Route index element={<HairdresserDashboard />} />
                    <Route path="profile/*" element={<HairdresserProfile />} />
                    <Route path="dashboard" element={<HairdresserDashboard />} />
                    <Route path="work-plan" element={<HairdresserWorkPlan />} />
                    <Route path="turns" element={<HairdresserTurnsPage />} />
                    <Route path="customers" element={<HairdresserCustomersPage />} />
                    <Route path="report" element={<HairdresserReport />} />
                </Route>
            )}

            {/* ======================== */}
            {/* === ریدایرکت‌های هوشمند === */}
            {/* ======================== */}
            {/* اگر کاربر مستقیماً برود به /admin یا /user، صبر کنه تا وضعیت مشخص بشه */}
            <Route path="/user/*" element={user ? <Navigate to="/user" replace /> : <Navigate to="/auth-layout" replace />} />
            <Route path="/admin/*" element={user ? <Navigate to="/admin" replace /> : <Navigate to="/auth-layout" replace />} />
            <Route path="/hairdresser/*" element={user ? <Navigate to="/hairdresser" replace /> : <Navigate to="/auth-layout" replace />} />

            {/* ======================== */}
            {/* === صفحات خطا === */}
            {/* ======================== */}
            <Route path="/404" element={<ErrorPage />} />
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRoutes;