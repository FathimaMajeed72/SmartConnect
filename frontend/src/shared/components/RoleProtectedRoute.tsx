import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "@/app/store/store";
import type { Role } from "@/features/auth/types/auth.types";

type RoleProtectedRouteProps = {
  allowedRole: Role;
};

export default function RoleProtectedRoute({
  allowedRole,
}: RoleProtectedRouteProps) {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}