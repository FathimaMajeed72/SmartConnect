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

import { useAvailableParents } from "../hooks/useAvailableParents";

import type { StudentParentRelationship } from "../types/student-parent.type";
import { useAssignParentToStudent } from "../hooks/useAssignParentToStudent";

interface AssignParentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
}

export default function AssignParentDialog({
  open,
  onOpenChange,
  studentId,
}: AssignParentDialogProps) {
  const [parentUserId, setParentUserId] = useState("");
  const [relationship, setRelationship] =
    useState<StudentParentRelationship>("MOTHER");
  const [isPrimaryContact, setIsPrimaryContact] = useState(false);

  const { data: parents, isPending, isError, error } = useAvailableParents();

  const assignParentMutation = useAssignParentToStudent(studentId);

  const handleSubmit = () => {
    if (!parentUserId) return;

    assignParentMutation.mutate(
      {
        parentUserId,
        relationship,
        isPrimaryContact,
      },
      {
        onSuccess: () => {
          setParentUserId("");
          setRelationship("MOTHER");
          setIsPrimaryContact(false);
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Parent</DialogTitle>
          <DialogDescription>
            Select an existing parent and assign them to this student.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Parent</Label>

            {isPending && (
              <p className="text-sm text-muted-foreground">
                Loading parents...
              </p>
            )}

            {isError && (
              <p className="text-sm text-destructive">
                {error.message || "Failed to load parents."}
              </p>
            )}

            {!isPending && !isError && (
              <Select value={parentUserId} onValueChange={setParentUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a parent" />
                </SelectTrigger>

                <SelectContent>
                  {parents?.map((parent) => (
                    <SelectItem key={parent.id} value={parent.id}>
                      {parent.firstName} {parent.lastName} ({parent.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

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
              id="primary-contact"
              checked={isPrimaryContact}
              onCheckedChange={(checked) =>
                setIsPrimaryContact(checked === true)
              }
            />

            <Label htmlFor="primary-contact">Set as primary contact</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button
              disabled={
                !parentUserId ||
                isPending ||
                isError ||
                assignParentMutation.isPending
              }
              onClick={handleSubmit}
            >
              {assignParentMutation.isPending
                ? "Assigning..."
                : "Assign Parent"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
