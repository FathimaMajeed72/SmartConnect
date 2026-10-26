import { useState } from "react";

import FormDialog from "@/shared/components/FormDialog";

import type { StudentStatus } from "../types/student-status";

interface UpdateStudentStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
  status: StudentStatus;
  onConfirm: () => Promise<void>;
}

const actionLabels: Record<StudentStatus, string> = {
  ACTIVE: "Activate",
  INACTIVE: "Deactivate",
};

export default function UpdateStudentStatusDialog({
  open,
  onOpenChange,
  studentName,
  status,
  onConfirm,
}: UpdateStudentStatusDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const actionLabel = actionLabels[status];

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      await onConfirm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`${actionLabel} Student`}
      description={`Are you sure you want to ${actionLabel.toLowerCase()} ${studentName}?`}
      onSubmit={handleSubmit}
      submitLabel={actionLabel}
      submittingLabel={
        status === "ACTIVE" ? "Activating..." : "Deactivating..."
      }
      isSubmitting={isSubmitting}
    >
      <div className="py-2 text-sm text-muted-foreground">
        This action will change the student's status.
      </div>
    </FormDialog>
  );
}