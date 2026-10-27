import { useState } from "react";

import { Button } from "@/shared/ui/button";

import { useStudentParents } from "../hooks/useStudentParents";
import AssignParentDialog from "./AssignParentDialog";
import { Pencil } from "lucide-react";
import EditStudentParentDialog from "./EditStudentParentDialog";
import type { StudentParentListItem } from "../types/student-parent.type";
import { useUpdateStudentParentStatus } from "../hooks/useUpdateStudentParentStatus";
import { toast } from "sonner";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

interface StudentParentsTabProps {
  studentId: string;
}

export default function StudentParentsTab({
  studentId,
}: StudentParentsTabProps) {
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedParent, setSelectedParent] =
    useState<StudentParentListItem | null>(null);

  const {
    data: parents,
    isPending,
    isError,
    error,
  } = useStudentParents(studentId);

  const updateParentStatusMutation = useUpdateStudentParentStatus(studentId);

  const handleStatusChange = (
    parentUserId: string,
    status: "ACTIVE" | "INACTIVE",
  ) => {
    updateParentStatusMutation.mutate(
      {
        parentUserId,
        data: { status },
      },
      {
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      },
    );
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Assigned Parents</h3>

        <Button size="sm" onClick={() => setIsAssignDialogOpen(true)}>
          Assign Parent
        </Button>
      </div>

      {isPending && (
        <p className="py-4 text-sm text-muted-foreground">
          Loading parent details...
        </p>
      )}

      {isError && (
        <p className="py-4 text-sm text-destructive">
          {error.message || "Failed to load parents."}
        </p>
      )}

      {!isPending && !isError && (!parents || parents.length === 0) && (
        <p className="py-4 text-sm text-muted-foreground">
          No parents assigned to this student yet.
        </p>
      )}

      {!isPending && !isError && parents && parents.length > 0 && (
        <div className="space-y-4">
          {parents.map((parent) => (
            <div
              key={parent.id}
              className={`space-y-3 rounded-lg border p-4 ${
                parent.status === "INACTIVE" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium">{parent.parentName}</h3>

                <div className="flex items-center gap-2">
                  {parent.isPrimaryContact && (
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      Primary Contact
                    </span>
                  )}

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setSelectedParent(parent)}
                    aria-label={`Edit relationship for ${parent.parentName}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    disabled={updateParentStatusMutation.isPending}
                    onClick={() =>
                      handleStatusChange(
                        parent.parentUserId,
                        parent.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
                      )
                    }
                  >
                    {parent.status === "ACTIVE" ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </div>

              <ParentDetailRow label="Email" value={parent.email} />

              <ParentDetailRow label="Phone" value={parent.phone ?? "—"} />

              <ParentDetailRow
                label="Relationship"
                value={parent.relationship}
              />

              <ParentDetailRow label="Status" value={parent.status} />
            </div>
          ))}
        </div>
      )}

      <AssignParentDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        studentId={studentId}
      />

      {selectedParent && (
        <EditStudentParentDialog
          key={selectedParent.id}
          open={Boolean(selectedParent)}
          onOpenChange={(open) => {
            if (!open) setSelectedParent(null);
          }}
          studentId={studentId}
          parent={selectedParent}
        />
      )}
    </div>
  );
}

interface ParentDetailRowProps {
  label: string;
  value: string;
}

function ParentDetailRow({ label, value }: ParentDetailRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className="text-right text-sm font-medium">{value || "—"}</span>
    </div>
  );
}
