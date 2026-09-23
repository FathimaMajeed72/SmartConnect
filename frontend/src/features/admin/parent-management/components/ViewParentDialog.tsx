import DetailsDialog from "@/shared/components/DetailsDialog";
import DetailsRow from "@/shared/components/DetailsRow";

import type { ParentDetails } from "../types/parent.types";
import ParentStatusBadge from "./ParentStatusBadge";

interface ViewParentDialogProps {
  parent: ParentDetails | null;
  open: boolean;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewParentDialog({
  parent,
  open,
  isLoading,
  onOpenChange,
}: ViewParentDialogProps) {
  return (
    <DetailsDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Parent Details"
      description="View parent information."
    >
      {isLoading && (
        <p className="text-sm text-muted-foreground">
          Loading parent details...
        </p>
      )}

      {!isLoading && parent && (
        <>
          <DetailsRow
            label="Name"
            value={`${parent.firstName} ${parent.lastName}`}
          />

          <DetailsRow
            label="Email"
            value={parent.email}
          />

          <DetailsRow
            label="Phone"
            value={parent.phone}
          />

          <DetailsRow
            label="Status"
            value={
              <ParentStatusBadge
                status={parent.status}
              />
            }
          />

          <DetailsRow
            label="Email Verified"
            value={parent.isEmailVerified ? "Yes" : "No"}
          />

          <DetailsRow
            label="Last Login"
            value={
              parent.lastLogin
                ? new Date(parent.lastLogin).toLocaleString()
                : "Never"
            }
          />

          <DetailsRow
            label="Created At"
            value={new Date(
              parent.createdAt,
            ).toLocaleDateString()}
          />

          <DetailsRow
            label="Updated At"
            value={new Date(
              parent.updatedAt,
            ).toLocaleDateString()}
          />
        </>
      )}

      {!isLoading && !parent && (
        <p className="text-sm text-destructive">
          Unable to load parent details.
        </p>
      )}
    </DetailsDialog>
  );
}