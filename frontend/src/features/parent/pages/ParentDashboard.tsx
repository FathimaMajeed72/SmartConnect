import { useAppDispatch } from "@/app/store/hooks";
import { logoutUser } from "@/features/auth/services/auth.service";
import { logout } from "@/features/auth/slices/authSlice";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

export default function ParentDashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());

      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Parent Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <div className="p-50"></div>
    </div>
  );
}