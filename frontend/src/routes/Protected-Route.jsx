import { Routes, Route } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/auth/*" element={<AuthLayout />} />

            <Route
                path="/user/*"
                element={
                    <ProtectedRoute allowedRoles={["user"]}>
                        <UserDashboardLayout />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/*"
                element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboardLayout />
                    </ProtectedRoute>
                }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<h1>404 - صفحه یافت نشد</h1>} />
        </Routes>
    );
}

export default AppRoutes;
