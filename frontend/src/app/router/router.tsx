import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "@/features/landing/pages/LandingPage";
import PublicLayout from "@/shared/layouts/PublicLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import VerifyOtpPage from "@/features/auth/pages/VerifyOtpPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import TeacherDashboard from "@/features/teacher/pages/TeacherDashboard";
import ParentDashboard from "@/features/parent/pages/ParentDashboard";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import AdminLayout from "@/features/admin/layouts/AdminLayout";
import RoleProtectedRoute from "@/shared/components/RoleProtectedRoute";
import UnauthorizedPage from "@/shared/pages/UnauthorizedPage";
import ParentManagement from "@/features/admin/pages/ParentManagement";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtpPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RoleProtectedRoute allowedRole="ADMIN" />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                path: "/admin/dashboard",
                element: <AdminDashboard />,
              },
              {
                path: "/admin/parents",
                element: <ParentManagement />,
              },
            ],
          },
        ],
      },
      {
        element: <RoleProtectedRoute allowedRole="TEACHER" />,
        children: [
          {
            path: "/teacher/dashboard",
            element: <TeacherDashboard />,
          },
        ],
      },
      {
        element: <RoleProtectedRoute allowedRole="PARENT" />,
        children: [
          {
            path: "/parent/dashboard",
            element: <ParentDashboard />,
          },
        ],
      },
    ],
  },

  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
