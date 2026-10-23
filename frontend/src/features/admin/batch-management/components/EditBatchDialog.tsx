import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { batchSchema, type BatchFormValues } from "../schemas/batch.schema";

import { useUpdateBatch } from "../hooks/useUpdateBatch";

import type { BatchListItem } from "../types/batch.type";

import { useAvailableClassTeachers } from "../hooks/useAvailableClassTeachers";

interface EditBatchDialogProps {
  classId: string;
  batch: BatchListItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditBatchDialog({
  classId,
  batch,
  open,
  onOpenChange,
}: EditBatchDialogProps) {
  const updateBatchMutation = useUpdateBatch(classId);

  // const [teachers, setTeachers] = useState<TeacherListItem[]>([]);
  // const [isTeachersLoading, setIsTeachersLoading] = useState(false);
  // const [teachersError, setTeachersError] = useState<string | null>(null);

  const {
    data: teachers,
    isLoading: isTeachersLoading,
    isError: teachersError,
    refetch,
  } = useAvailableClassTeachers();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<BatchFormValues>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      name: "",
      classTeacherId: "",
      capacity: 30,
    },
  });

  const selectedTeacherId = useWatch({
    control,
    name: "classTeacherId",
  });

  // Populate the form whenever a batch is selected for editing.
  useEffect(() => {
    if (open && batch) {
      reset({
        name: batch.name,
        classTeacherId: batch.classTeacherId,
        capacity: batch.capacity,
      });
    }

    if (!open) {
      reset({
        name: "",
        classTeacherId: "",
        capacity: 30,
      });
    }
  }, [open, batch, reset]);

  // // Load active teachers when the dialog opens.
  // useEffect(() => {
  //   if (!open) return;

  //   let cancelled = false;

  //   const loadTeachers = async () => {
  //     setIsTeachersLoading(true);
  //     setTeachersError(null);

  //     try {
  //       const response = await getTeachers({
  //         page: 1,
  //         limit: 100,
  //         status: "ACTIVE",
  //       });

  //       if (!cancelled) {
  //         setTeachers(response.teachers);
  //       }
  //     } catch {
  //       if (!cancelled) {
  //         setTeachers([]);
  //         setTeachersError("Failed to load active teachers.");
  //       }
  //     } finally {
  //       if (!cancelled) {
  //         setIsTeachersLoading(false);
  //       }
  //     }
  //   };

  //   void loadTeachers();

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [open]);

  // const activeTeachers = teachers.filter(
  //   (teacher) => teacher.status === "ACTIVE",
  // );

  const currentTeacherIsMissing =
    Boolean(batch?.classTeacherId) &&
    !teachers?.some((teacher) => teacher.id === batch?.classTeacherId);

  const onSubmit = (values: BatchFormValues) => {
    if (!batch) return;

    if (batch.status !== "ACTIVE") {
      return;
    }

    updateBatchMutation.mutate(
      {
        batchId: batch.id,
        data: values,
      },
      {
        onSuccess: () => {
          reset();
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open && batch?.status === "ACTIVE"}
      onOpenChange={(isOpen) => {
        if (updateBatchMutation.isPending) return;
        onOpenChange(isOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Batch</DialogTitle>
          <DialogDescription>
            Update the batch name, class teacher, or capacity.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Batch Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-batch-name">Batch Name</Label>

            <Input
              id="edit-batch-name"
              placeholder="e.g. Batch A"
              {...register("name")}
              disabled={updateBatchMutation.isPending}
            />

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Class Teacher */}
          <div className="space-y-2">
            <Label htmlFor="edit-class-teacher">Class Teacher</Label>

            {isTeachersLoading ? (
              <p className="text-sm text-muted-foreground">
                Loading available teachers...
              </p>
            ) : teachersError ? (
              <div className="space-y-2">
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
              <>
                <Select
                  value={selectedTeacherId}
                  onValueChange={(value) =>
                    setValue("classTeacherId", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  disabled={
                    updateBatchMutation.isPending ||
                    (!teachers?.length && !currentTeacherIsMissing)
                  }
                >
                  <SelectTrigger id="edit-class-teacher">
                    <SelectValue placeholder="Select a class teacher" />
                  </SelectTrigger>

                  <SelectContent>
                    {/* Preserve the currently assigned teacher */}
                    {currentTeacherIsMissing && batch && (
                      <SelectItem value={batch.classTeacherId}>
                        {batch.classTeacherName}
                      </SelectItem>
                    )}

                    {/* Display other available teachers */}
                    {teachers?.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.firstName} {teacher.lastName} (
                        {teacher.teacherId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {teachers?.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No other available teachers. The currently assigned teacher
                    can remain selected.
                  </p>
                )}
              </>
            )}

            {errors.classTeacherId && (
              <p className="text-sm text-destructive">
                {errors.classTeacherId.message}
              </p>
            )}
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <Label htmlFor="edit-batch-capacity">Capacity</Label>

            <Input
              id="edit-batch-capacity"
              type="number"
              min={1}
              {...register("capacity", { valueAsNumber: true })}
              disabled={updateBatchMutation.isPending}
            />

            {errors.capacity && (
              <p className="text-sm text-destructive">
                {errors.capacity.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateBatchMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                updateBatchMutation.isPending ||
                isTeachersLoading ||
                Boolean(teachersError) ||
                (!teachers?.length && !currentTeacherIsMissing)
              }
            >
              {updateBatchMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
