
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

import { batchSchema, type BatchFormValues } from "../schemas/batch.schema";

import { useCreateBatch } from "../hooks/useCreateBatch";
import { useAvailableClassTeachers } from "../hooks/useAvailableClassTeachers";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface AddBatchDialogProps {
  classId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddBatchDialog({
  classId,
  open,
  onOpenChange,
}: AddBatchDialogProps) {
  const createBatchMutation = useCreateBatch(classId);

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

  // useEffect(() => {
  //   if (!open) {
  //     reset({
  //       name: "",
  //       classTeacherId: "",
  //       capacity: 30,
  //     });
  //   }
  // }, [open, reset]);

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

  const onSubmit = (values: BatchFormValues) => {
    createBatchMutation.mutate(values, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (createBatchMutation.isPending) return;
        onOpenChange(isOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Batch</DialogTitle>
          <DialogDescription>
            Create a batch for the selected class.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="batch-name">Batch Name</Label>
            <Input
              id="batch-name"
              placeholder="e.g. Batch A"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="class-teacher">Class Teacher</Label>

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
                  disabled={createBatchMutation.isPending || !teachers?.length}
                >
                  <SelectTrigger id="class-teacher">
                    <SelectValue
                      placeholder={
                        !teachers?.length
                          ? "No available teachers"
                          : "Select a class teacher"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
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
                    No available class teachers. Please add or release a teacher
                    before creating this batch.
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

          <div className="space-y-2">
            <Label htmlFor="batch-capacity">Capacity</Label>
            <Input
              id="batch-capacity"
              type="number"
              min={1}
              {...register("capacity", { valueAsNumber: true })}
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
              disabled={createBatchMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                createBatchMutation.isPending ||
                isTeachersLoading ||
                teachersError ||
                !teachers?.length
              }
            >
              {createBatchMutation.isPending ? "Creating..." : "Create Batch"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
