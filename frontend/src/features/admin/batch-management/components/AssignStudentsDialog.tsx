import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import type { BatchListItem } from "../types/batch.type";
import { useStudents } from "../../student-management/hooks/useStudents";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Checkbox } from "@/shared/ui/checkbox";
import type { StudentListItem } from "../../student-management/types/student.type";
import { useAssignStudentsToBatch } from "../../student-management/hooks/useAssignStudentsToBatch";
import { useBatches } from "../hooks/useBatches";
import { useUnassignStudentsFromBatch } from "../../student-management/hooks/useUnassignStudentsFromBatch";

interface AssignStudentsDialogProps {
  classId: string;
  batch: BatchListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AssignStudentsDialog({
  classId,
  batch,
  open,
  onOpenChange,
}: AssignStudentsDialogProps) {
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  const [studentToUnassign, setStudentToUnassign] =
    useState<StudentListItem | null>(null);

  const { data, isLoading, isError, refetch } = useStudents({
    page: 1,
    limit: 100,
    classId,
  });

  const { data: batchesData } = useBatches(classId);

  const assignStudentsMutation = useAssignStudentsToBatch(classId);

  const unassignStudentsMutation = useUnassignStudentsFromBatch(classId);

  const students = data?.students ?? [];
  const batches = batchesData?.batches ?? [];

  const batchNameMap = new Map(batches.map((item) => [item.id, item.name]));

  const handleToggleStudent = (studentId: string) => {
    setSelectedStudentIds((previous) =>
      previous.includes(studentId)
        ? previous.filter((id) => id !== studentId)
        : [...previous, studentId],
    );
  };

  const handleAssignStudents = () => {
    if (!batch || selectedStudentIds.length === 0) {
      return;
    }

    assignStudentsMutation.mutate(
      {
        batchId: batch.id,
        studentIds: selectedStudentIds,
      },
      {
        onSuccess: () => {
          setSelectedStudentIds([]);
          onOpenChange(false);
        },
      },
    );
  };

  const handleUnassignStudent = () => {
    if (!batch || !studentToUnassign) return;

    unassignStudentsMutation.mutate(
      {
        batchId: batch.id,
        studentIds: [studentToUnassign.id],
      },
      {
        onSuccess: () => {
          setStudentToUnassign(null);
        },
      },
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedStudentIds([]);
          }

          onOpenChange(isOpen);
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Students to Batch</DialogTitle>

            <DialogDescription>
              Select students to assign to {batch?.name}.
            </DialogDescription>
          </DialogHeader>
          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading students...</p>
          )}

          {isError && (
            <div className="space-y-2">
              <p className="text-sm text-destructive">
                Failed to load students.
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={() => void refetch()}
              >
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !isError && students.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No students found in this class.
            </p>
          )}

          {!isLoading && !isError && students.length > 0 && (
            <div className="max-h-80 overflow-y-auto rounded-md border">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted">
                  <tr>
                    <th className="w-10 p-3">
                      <span className="sr-only">Select</span>
                    </th>
                    <th className="p-3 text-left">Student</th>
                    <th className="p-3 text-left">Admission No.</th>
                    <th className="p-3 text-left">Batch</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student: StudentListItem) => {
                    const isSelected = selectedStudentIds.includes(student.id);
                    const isAlreadyInTargetBatch =
                      student.batchId === batch?.id;

                    const assignedBatchName = student.batchId
                      ? batchNameMap.get(student.batchId)
                      : undefined;

                    return (
                      <tr
                        key={student.id}
                        className={`border-t transition-colors ${
                          isAlreadyInTargetBatch
                            ? "bg-green-50 dark:bg-green-950/30"
                            : ""
                        }`}
                      >
                        <td className="p-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() =>
                              handleToggleStudent(student.id)
                            }
                            disabled={isAlreadyInTargetBatch}
                            aria-label={`Select ${student.firstName} ${student.lastName}`}
                          />
                        </td>

                        <td className="p-3">
                          {student.firstName} {student.lastName}
                        </td>

                        <td className="p-3">{student.admissionNumber}</td>

                        <td className="p-3">
                          {isAlreadyInTargetBatch ? (
                            <Badge className="border-green-200 bg-green-100 text-green-800 hover:bg-green-100 dark:border-green-800 dark:bg-green-900 dark:text-green-200">
                              {assignedBatchName ?? batch?.name} · This batch
                            </Badge>
                          ) : student.batchId ? (
                            <Badge variant="outline">
                              {assignedBatchName ?? "Another batch"}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">
                              Unassigned
                            </span>
                          )}
                        </td>

                        <td className="p-3">
                          {isAlreadyInTargetBatch && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setStudentToUnassign(student)}
                            >
                              Unassign
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-end gap-2 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={
                assignStudentsMutation.isPending
              }
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleAssignStudents}
              disabled={
                !batch ||
                selectedStudentIds.length === 0 ||
                assignStudentsMutation.isPending
              }
            >
              {assignStudentsMutation.isPending
                ? "Assigning..."
                : "Assign Students"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!studentToUnassign}
        onOpenChange={(isOpen) => {
          if (!isOpen && !unassignStudentsMutation.isPending) {
            setStudentToUnassign(null);
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Unassign Student?</DialogTitle>

            <DialogDescription>
              Are you sure you want to unassign{" "}
              <strong>
                {studentToUnassign?.firstName} {studentToUnassign?.lastName}
              </strong>{" "}
              from {batch?.name}? The student will remain in the class but will
              no longer belong to this batch.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStudentToUnassign(null)}
              disabled={unassignStudentsMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={handleUnassignStudent}
              disabled={unassignStudentsMutation.isPending}
            >
              {unassignStudentsMutation.isPending
                ? "Unassigning..."
                : "Unassign Student"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
