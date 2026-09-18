import { useState } from "react";
import FormDialog from "@/shared/components/FormDialog";
import type { UserStatus } from "../../types/user-status";

interface UpdateTeacherStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacherName: string;
  status: UserStatus;
  onConfirm: () => Promise<void>;
}

const actionLabels: Record<UserStatus, string> = {
  INVITED: "Invite",
  ACTIVE: "Activate",
  INACTIVE: "Deactivate",
  BLOCKED: "Block",
};

export default function UpdateTeacherStatusDialog({
  open,
  onOpenChange,
  teacherName,
  status,
  onConfirm,
}: UpdateTeacherStatusDialogProps) {
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
      title={`${actionLabel} Teacher`}
      description={`Are you sure you want to ${actionLabel.toLowerCase()} ${teacherName}?`}
      onSubmit={handleSubmit}
      submitLabel={actionLabel}
      submittingLabel={`${actionLabel}ing...`}
      isSubmitting={isSubmitting}
    >
      <div className="py-2 text-sm text-muted-foreground">
        This action will change the teacher's account status.
      </div>
    </FormDialog>
  );
}