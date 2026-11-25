import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { useParent } from "../context/use-parent";
import { useEffect } from "react";

export default function ChildDashboard() {
  const { childId } = useParams();
  const navigate = useNavigate();

  const {
    children,
    selectedChild,
    setSelectedChild,
    isLoading,
    isError,
    error,
  } = useParent();

  useEffect(() => {
    const child = children.find((item) => item.id === childId);

    if (child && child.id !== selectedChild?.id) {
      setSelectedChild(child);
    }
  }, [childId, children, selectedChild, setSelectedChild]); 

  if (isLoading) {
    return (
      <p className="p-8 text-muted-foreground">Loading child details...</p>
    );
  }

  if (isError) {
    return (
      <p className="p-8 text-destructive">
        {error instanceof Error
          ? error.message
          : "Failed to load child details."}
      </p>
    );
  }

  const child = children.find((item) => item.id === childId);

  if (!child) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Child not found</h2>
        <p className="mt-2 text-muted-foreground">
          This child is not linked to your account.
        </p>
        <Button className="mt-4" onClick={() => navigate("/parent/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate("/parent/dashboard")}>
          Back to My Children
        </Button>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-muted text-xl font-semibold">
            {child.profileImage ? (
              <img
                src={child.profileImage}
                alt={`${child.firstName} ${child.lastName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              child.firstName.charAt(0)
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              {child.firstName} {child.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              Admission No: {child.admissionNumber}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Class</p>
            <p className="font-medium">
              {child.className} ({child.classCode})
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Academic Year</p>
            <p className="font-medium">{child.academicYear}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Batch</p>
            <p className="font-medium">{child.batchName ?? "Not assigned"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
