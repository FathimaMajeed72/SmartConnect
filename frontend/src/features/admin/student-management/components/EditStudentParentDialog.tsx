import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { Button } from "@/shared/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { Checkbox } from "@/shared/ui/checkbox";

import { Label } from "@/shared/ui/label";

import type {
  StudentParentListItem,
  StudentParentRelationship,
} from "../types/student-parent.type";
import { useUpdateStudentParent } from "../hooks/useUpdateStudentParent";
import { getErrorMessage } from "@/core/utils/getErrorMessage";
import { toast } from "sonner";

interface EditStudentParentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  parent: StudentParentListItem;
}

export default function EditStudentParentDialog({
  open,
  onOpenChange,
  studentId,
  parent,
}: EditStudentParentDialogProps) {
  const [relationship, setRelationship] = useState<StudentParentRelationship>(
    parent.relationship,
  );

  const [isPrimaryContact, setIsPrimaryContact] = useState(
    parent.isPrimaryContact,
  );

  const updateParentMutation = useUpdateStudentParent(studentId);

  const handleSubmit = () => {
    updateParentMutation.mutate(
      {
        parentUserId: parent.parentUserId,
        data: {
          relationship,
          isPrimaryContact,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Parent Relationship</DialogTitle>

          <DialogDescription>
            Update the relationship details for {parent.parentName}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Relationship</Label>

            <Select
              value={relationship}
              onValueChange={(value) =>
                setRelationship(value as StudentParentRelationship)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="MOTHER">Mother</SelectItem>
                <SelectItem value="FATHER">Father</SelectItem>
                <SelectItem value="GUARDIAN">Guardian</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="edit-primary-contact"
              checked={isPrimaryContact}
              onCheckedChange={(checked) =>
                setIsPrimaryContact(checked === true)
              }
            />

            <Label htmlFor="edit-primary-contact">Set as primary contact</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button
              disabled={updateParentMutation.isPending}
              onClick={handleSubmit}
            >
              {updateParentMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
