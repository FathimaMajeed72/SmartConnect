import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updateClass } from "../services/class.service";
import type {
  ClassListItem,
  UpdateClassRequest,
} from "../types/class.types";

import {
  updateClassSchema,
  type UpdateClassFormData,
} from "../schemas/class.schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";

interface EditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classDetails: ClassListItem;
  onClassUpdated: () => Promise<void>;
}

export default function EditClassDialog({
  open,
  onOpenChange,
  classDetails,
  onClassUpdated,
}: EditClassDialogProps) {
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateClassFormData>({
    resolver: zodResolver(updateClassSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: classDetails.name,
        code: classDetails.code,
        description: classDetails.description ?? "",
      });
    }
  }, [open, classDetails, reset]);

  const onSubmit = async (
    data: UpdateClassFormData,
  ) => {
    try {
      setIsSubmitting(true);

      const request: UpdateClassRequest = {
        name: data.name,
        code: data.code,
        description: data.description || undefined,
      };

      await updateClass(
        classDetails.id,
        request,
      );

      toast.success(
        "Class updated successfully.",
      );

      onOpenChange(false);

      await onClassUpdated();
    } catch (error) {
      console.error(
        "Failed to update class:",
        error,
      );

      toast.error(
        "Failed to update class.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      reset();
    }

    onOpenChange(value);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Class
          </DialogTitle>

          <DialogDescription>
            Update the class information.
            Academic year cannot be changed.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Class Name */}
          <div className="space-y-2">
            <label
              htmlFor="edit-class-name"
              className="text-sm font-medium"
            >
              Class Name
            </label>

            <Input
              id="edit-class-name"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Class Code */}
          <div className="space-y-2">
            <label
              htmlFor="edit-class-code"
              className="text-sm font-medium"
            >
              Class Code
            </label>

            <Input
              id="edit-class-code"
              {...register("code")}
            />

            {errors.code && (
              <p className="text-sm text-destructive">
                {errors.code.message}
              </p>
            )}
          </div>

          {/* Academic Year */}
          <div className="space-y-2">
            <label
              htmlFor="edit-academic-year"
              className="text-sm font-medium"
            >
              Academic Year
            </label>

            <Input
              id="edit-academic-year"
              value={classDetails.academicYear}
              disabled
              readOnly
            />

            <p className="text-xs text-muted-foreground">
              Academic year cannot be changed.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="edit-class-description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <Textarea
              id="edit-class-description"
              placeholder="Enter class description"
              {...register("description")}
            />

            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                handleOpenChange(false)
              }
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Updating..."
                : "Update Class"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}