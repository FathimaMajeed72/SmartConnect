import { useState } from "react";

import { Button } from "@/shared/ui/button";

import { useBatches } from "../hooks/useBatches";
import { useUpdateBatchStatus } from "../hooks/useUpdateBatchStatus";

import BatchTable from "./BatchTable";
import AddBatchDialog from "./AddBatchDialog";
import EditBatchDialog from "./EditBatchDialog";
import ActivateBatchDialog from "./ActivateBatchDialog";

import type { BatchListItem } from "../types/batch.type";
import AssignStudentsDialog from "./AssignStudentsDialog";

interface BatchTabProps {
  classId: string;
}

export default function BatchTab({ classId }: BatchTabProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useBatches(classId);

  const updateBatchStatusMutation = useUpdateBatchStatus(classId);

  const [selectedBatch, setSelectedBatch] = useState<BatchListItem | null>(
    null,
  );

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [batchToActivate, setBatchToActivate] = useState<BatchListItem | null>(
    null,
  );

  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);

  const [batchToAssignStudents, setBatchToAssignStudents] =
    useState<BatchListItem | null>(null);

  const [isAssignStudentsDialogOpen, setIsAssignStudentsDialogOpen] =
    useState(false);

  const batches = data?.batches ?? [];

  const handleToggleStatus = (batch: BatchListItem) => {
    if (batch.status === "ACTIVE") {
      updateBatchStatusMutation.mutate(
        {
          batchId: batch.id,
          status: "INACTIVE",
        },
      );

      return;
    }

    setBatchToActivate(batch);
    setIsActivateDialogOpen(true);
  };
  const handleEdit = (batch: BatchListItem) => {
    setSelectedBatch(batch);
    setIsEditDialogOpen(true);
  };

  const handleAssignStudents = (batch: BatchListItem) => {
    setBatchToAssignStudents(batch);
    setIsAssignStudentsDialogOpen(true);
  };

  if (isError) {
    return (
      <div className="flex min-h-75 flex-col items-center justify-center gap-3">
        <p className="text-sm text-destructive">Failed to load batches.</p>

        <Button type="button" variant="outline" onClick={() => void refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Batches</h2>

          <p className="text-sm text-muted-foreground">
            Manage batches and their assigned class teachers.
          </p>
        </div>

        <Button type="button" onClick={() => setIsAddDialogOpen(true)}>
          Add Batch
        </Button>
      </div>

      {/* Batch Table */}
      <BatchTable
        batches={batches}
        isLoading={isLoading}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
        onAssignStudents={handleAssignStudents}
      />

      {/* Add Batch Dialog */}
      <AddBatchDialog
        classId={classId}
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />

      {/* Edit Batch Dialog */}
      <EditBatchDialog
        classId={classId}
        batch={selectedBatch}
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);

          if (!open) {
            setSelectedBatch(null);
          }
        }}
      />

      <ActivateBatchDialog
        classId={classId}
        batch={batchToActivate}
        open={isActivateDialogOpen}
        onOpenChange={(open) => {
          setIsActivateDialogOpen(open);

          if (!open) {
            setBatchToActivate(null);
          }
        }}
      />
      <AssignStudentsDialog
        classId={classId}
        batch={batchToAssignStudents}
        open={isAssignStudentsDialogOpen}
        onOpenChange={(open) => {
          setIsAssignStudentsDialogOpen(open);

          if (!open) {
            setBatchToAssignStudents(null);
          }
        }}
      />
    </div>
  );
}
