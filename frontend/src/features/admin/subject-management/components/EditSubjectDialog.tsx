import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updateSubject } from "../services/subject.service";
import type {
  SubjectListItem,
  UpdateSubjectRequest,
} from "../types/subject.types";

import {
  updateSubjectSchema,
  type UpdateSubjectFormData,
} from "../schemas/subject.schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

import { getErrorMessage } from "@/core/utils/getErrorMessage";

interface EditSubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subjectDetails: SubjectListItem;
  onSubjectUpdated: () => Promise<void>;
}

export default function EditSubjectDialog({
  open,
  onOpenChange,
  subjectDetails,
  onSubjectUpdated,
}: EditSubjectDialogProps) {
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateSubjectFormData>({
    resolver: zodResolver(updateSubjectSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: subjectDetails.name,
        code: subjectDetails.code,
      });
    }
  }, [open, subjectDetails, reset]);

  const onSubmit = async (
    data: UpdateSubjectFormData,
  ) => {
    try {
      setIsSubmitting(true);

      const request: UpdateSubjectRequest = {
        name: data.name,
        code: data.code,
      };

      await updateSubject(
        subjectDetails.id,
        request,
      );

      toast.success(
        "Subject updated successfully.",
      );

      onOpenChange(false);

      await onSubjectUpdated();
    } catch (error) {
      console.error(
        "Failed to update subject:",
        error,
      );

      toast.error(getErrorMessage(error));
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
            Edit Subject
          </DialogTitle>

          <DialogDescription>
            Update the subject information.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Subject Name */}
          <div className="space-y-2">
            <label
              htmlFor="edit-subject-name"
              className="text-sm font-medium"
            >
              Subject Name
            </label>

            <Input
              id="edit-subject-name"
              placeholder="e.g. Mathematics"
              {...register("name")}
            />

            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Subject Code */}
          <div className="space-y-2">
            <label
              htmlFor="edit-subject-code"
              className="text-sm font-medium"
            >
              Subject Code
            </label>

            <Input
              id="edit-subject-code"
              placeholder="e.g. MATH"
              {...register("code")}
            />

            {errors.code && (
              <p className="text-sm text-destructive">
                {errors.code.message}
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
                : "Update Subject"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}