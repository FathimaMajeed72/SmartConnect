import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createClass } from "../services/class.service";
import type { CreateClassRequest } from "../types/class.types";

import {
  classSchema,
  type ClassFormData,
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



interface AddClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClassCreated: () => Promise<void>;
}

export default function AddClassDialog({
  open,
  onOpenChange,
  onClassCreated,
}: AddClassDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      code: "",
      academicYear: "",
      description: "",
    },
  });

  const onSubmit = async (
    data: ClassFormData,
  ) => {
    try {
      setIsSubmitting(true);

      const request: CreateClassRequest = {
        name: data.name,
        code: data.code,
        academicYear: data.academicYear,
        description: data.description || undefined,
      };

      await createClass(request);

      toast.success("Class created successfully.");

      reset();
      onOpenChange(false);

      await onClassCreated();
    } catch (error) {
      console.error("Failed to create class:", error);

      toast.error("Failed to create class.");
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
            Add Class
          </DialogTitle>

          <DialogDescription>
            Create a new class by providing its
            basic information.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Class Name */}
          <div className="space-y-2">
            <label
              htmlFor="class-name"
              className="text-sm font-medium"
            >
              Class Name
            </label>

            <Input
              id="class-name"
              placeholder="e.g. Class 10"
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
              htmlFor="class-code"
              className="text-sm font-medium"
            >
              Class Code
            </label>

            <Input
              id="class-code"
              placeholder="e.g. CLS10"
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
              htmlFor="academic-year"
              className="text-sm font-medium"
            >
              Academic Year
            </label>

            <Input
              id="academic-year"
              placeholder="e.g. 2026-2027"
              {...register("academicYear")}
            />

            {errors.academicYear && (
              <p className="text-sm text-destructive">
                {errors.academicYear.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="class-description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <Textarea
              id="class-description"
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
                ? "Creating..."
                : "Create Class"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}