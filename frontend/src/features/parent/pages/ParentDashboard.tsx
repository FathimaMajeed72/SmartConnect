import { useAppDispatch } from "@/app/store/hooks";
import { logoutUser } from "@/features/auth/services/auth.service";
import { logout } from "@/features/auth/slices/authSlice";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";
import { useParent } from "../context/use-parent";

export default function ParentDashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    children,
    selectedChild,
    setSelectedChild,
    isLoading,
    isError,
    error,
  } = useParent();

  if (isLoading) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Loading your children...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <p className="text-destructive">
          {error instanceof Error ? error.message : "Failed to load children."}
        </p>
      </div>
    );
  }

  if (!children?.length) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <p className="mt-4 text-muted-foreground">
          No children are currently linked to your account. Please contact the
          school administrator.
        </p>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());

      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChildSelect = (child: (typeof children)[number]) => {
    setSelectedChild(child);
    navigate(`/parent/children/${child.id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Parent Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">My Children</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {children?.map((child) => (
            <div
              key={child.id}
              onClick={() => handleChildSelect(child)}
              className={`cursor-pointer rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${
                selectedChild?.id === child.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "bg-card"
              }`}
            >
              {/* Student Information */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-muted">
                  {child.profileImage ? (
                    <img
                      src={child.profileImage}
                      alt={`${child.firstName} ${child.lastName}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg font-semibold">
                      {child.firstName.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {child.firstName} {child.lastName}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Admission No: {child.admissionNumber}
                  </p>
                </div>
              </div>

              {/* Academic Information */}
              <div className="mt-5 space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Class</span>
                  <span className="font-medium">
                    {child.className} ({child.classCode})
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Academic Year</span>
                  <span className="font-medium">{child.academicYear}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Batch</span>
                  <span className="font-medium">
                    {child.batchName ?? "Not assigned"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
