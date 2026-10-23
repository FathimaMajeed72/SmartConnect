import { useState } from "react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { useAvailableClassTeachers } from "../hooks/useAvailableClassTeachers";
import { useUpdateBatchStatus } from "../hooks/useUpdateBatchStatus";

import type { BatchListItem } from "../types/batch.type";

interface ActivateBatchDialogProps {
  classId: string;
  batch: BatchListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ActivateBatchDialog({
  classId,
  batch,
  open,
  onOpenChange,
}: ActivateBatchDialogProps) {
  const [selectedTeacherId, setSelectedTeacherId] = useState("");

  const {
    data: teachers,
    isLoading,
    isError,
    refetch,
  } = useAvailableClassTeachers();

  const updateBatchStatusMutation = useUpdateBatchStatus(classId);

  const handleActivate = () => {
    console.log("Activate button clicked");
    console.log("Selected batch:", batch);
    console.log("Selected teacher ID:", selectedTeacherId);

    if (!batch || !selectedTeacherId) {
      console.log("Activation stopped: batch or teacher is missing");
      return;
    }

    updateBatchStatusMutation.mutate(
      {
        batchId: batch.id,
        status: "ACTIVE",
        classTeacherId: selectedTeacherId,
      },
      {
        onSuccess: () => {
          console.log("Batch activated successfully");
          setSelectedTeacherId("");
          onOpenChange(false);
        },
        onError: (error) => {
          console.error("Batch activation failed:", error);
        },
      },
    );
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSelectedTeacherId("");
    }

    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Activate Batch</DialogTitle>
          <DialogDescription>
            Select an available class teacher to activate{" "}
            <strong>{batch?.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">
            Loading available teachers...
          </p>
        ) : isError ? (
          <div className="space-y-3">
            <p className="text-sm text-destructive">
              Failed to load available teachers.
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => void refetch()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <label htmlFor="class-teacher" className="text-sm font-medium">
              Class Teacher
            </label>

            <select
              id="class-teacher"
              value={selectedTeacherId}
              onChange={(event) => setSelectedTeacherId(event.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              disabled={!teachers?.length}
            >
              <option value="">Select a teacher</option>

              {teachers?.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName} ({teacher.teacherId})
                </option>
              ))}
            </select>

            {teachers?.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No available class teachers. Please add or release a teacher
                before activating this batch.
              </p>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={updateBatchStatusMutation.isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleActivate}
            disabled={
              !batch ||
              !selectedTeacherId ||
              isLoading ||
              isError ||
              updateBatchStatusMutation.isPending
            }
          >
            {updateBatchStatusMutation.isPending
              ? "Activating..."
              : "Activate Batch"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
