import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createSubject } from "../services/subject.service";
import type {
  CreateSubjectRequest,
} from "../types/subject.types";

import {
  subjectSchema,
  type SubjectFormData,
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

interface AddSubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubjectCreated: () => Promise<void>;
}

export default function AddSubjectDialog({
  open,
  onOpenChange,
  onSubjectCreated,
}: AddSubjectDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });

  const onSubmit = async (
    data: SubjectFormData,
  ) => {
    try {
      setIsSubmitting(true);

      const request: CreateSubjectRequest = {
        name: data.name,
        code: data.code,
      };

      await createSubject(request);

      toast.success("Subject created successfully.");

      reset();
      onOpenChange(false);

      await onSubjectCreated();
    } catch (error) {
      console.error(
        "Failed to create subject:",
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
            Add Subject
          </DialogTitle>

          <DialogDescription>
            Create a new subject by providing its
            basic information.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Subject Name */}
          <div className="space-y-2">
            <label
              htmlFor="subject-name"
              className="text-sm font-medium"
            >
              Subject Name
            </label>

            <Input
              id="subject-name"
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
              htmlFor="subject-code"
              className="text-sm font-medium"
            >
              Subject Code
            </label>

            <Input
              id="subject-code"
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
                ? "Creating..."
                : "Create Subject"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}