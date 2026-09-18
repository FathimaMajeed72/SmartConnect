import { useState } from "react";
import FormDialog from "@/shared/components/FormDialog";

interface ResendTeacherInvitationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacherName: string;
  onConfirm: () => Promise<void>;
}

export default function ResendTeacherInvitationDialog({
  open,
  onOpenChange,
  teacherName,
  onConfirm,
}: ResendTeacherInvitationDialogProps) {
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
      description={`Are you sure you want to resend the invitation to ${teacherName}?`}
      onSubmit={handleSubmit}
      submitLabel="Resend Invitation"
      submittingLabel="Sending..."
      isSubmitting={isSubmitting}
    >
      <div className="py-2 text-sm text-muted-foreground">
        A new invitation link will be sent to the teacher's
        registered email address. The previous invitation link
        will no longer be valid.
      </div>
    </FormDialog>
  );
}