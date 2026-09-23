import { useState } from "react";

import FormDialog from "@/shared/components/FormDialog";

import type { UserStatus } from "../../types/user-status";

interface UpdateParentStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentName: string;
  status: UserStatus;
  onConfirm: () => Promise<void>;
}

const actionLabels: Partial<Record<UserStatus, string>> = {
  INVITED: "Invite",
  ACTIVE: "Activate",
  INACTIVE: "Deactivate",
  BLOCKED: "Block",
};

export default function UpdateParentStatusDialog({
  open,
  onOpenChange,
  parentName,
  status,
  onConfirm,
}: UpdateParentStatusDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const actionLabel = actionLabels[status];

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!actionLabel) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onConfirm();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!actionLabel) {
    return null;
  }

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`${actionLabel} Parent`}
      description={`Are you sure you want to ${actionLabel.toLowerCase()} ${parentName}?`}
      onSubmit={handleSubmit}
      submitLabel={actionLabel}
      submittingLabel={`${actionLabel}ing...`}
      isSubmitting={isSubmitting}
    >
      <div className="py-2 text-sm text-muted-foreground">
        This action will change the parent's account status.
      </div>
    </FormDialog>
  );
}