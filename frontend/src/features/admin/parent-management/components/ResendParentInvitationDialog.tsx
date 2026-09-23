import { useState } from "react";

import FormDialog from "@/shared/components/FormDialog";

interface ResendParentInvitationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentName: string;
  onConfirm: () => Promise<void>;
}

export default function ResendParentInvitationDialog({
  open,
  onOpenChange,
  parentName,
  onConfirm,
}: ResendParentInvitationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      title="Resend Invitation"
      description={`Are you sure you want to resend the invitation to ${parentName}?`}
      onSubmit={handleSubmit}
      submitLabel="Resend Invitation"
      submittingLabel="Resending..."
      isSubmitting={isSubmitting}
    >
      <div className="py-2 text-sm text-muted-foreground">
        A new invitation email will be sent to the parent's registered
        email address. The previous invitation link
        will no longer be valid.
      </div>
    </FormDialog>
  );
}