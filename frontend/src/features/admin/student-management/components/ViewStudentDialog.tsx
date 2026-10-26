import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { Badge } from "@/shared/ui/badge";

import { useStudentById } from "../hooks/useStudentById";

interface ViewStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
}

export default function ViewStudentDialog({
  open,
  onOpenChange,
  studentId,
}: ViewStudentDialogProps) {
  const {
    data: student,
    isPending,
    isError,
    error,
  } = useStudentById(open ? studentId : "");



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
          <DialogDescription>
            View the student's admission and personal information.
          </DialogDescription>
        </DialogHeader>

        {isPending && (
          <p className="py-4 text-sm text-muted-foreground">
            Loading student details...
          </p>
        )}

        {isError && (
          <p className="py-4 text-sm text-destructive">
            {error.message || "Failed to load student details."}
          </p>
        )}

        {!isPending && !isError && student && (
          <div className="space-y-4 py-2">
            <DetailRow
              label="Admission Number"
              value={student.admissionNumber}
            />

            <DetailRow
              label="First Name"
              value={student.firstName}
            />

            <DetailRow
              label="Last Name"
              value={student.lastName}
            />

            <DetailRow
              label="Date of Birth"
              value={student.dateOfBirth.slice(0, 10)}
            />

            <DetailRow
              label="Gender"
              value={student.gender}
            />

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                Status
              </span>

              <Badge
                variant={
                  student.status === "ACTIVE"
                    ? "default"
                    : "secondary"
                }
              >
                {student.status}
              </Badge>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span className="text-right text-sm font-medium">
        {value || "—"}
      </span>
    </div>
  );
}