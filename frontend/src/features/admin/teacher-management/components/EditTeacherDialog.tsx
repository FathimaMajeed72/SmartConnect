import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  teacherSchema,
  type TeacherFormData,
} from "../schemas/teacher.schema";

import {
  getTeacherById,
  updateTeacher,
} from "../services/teacher.service";

import FormDialog from "@/shared/components/FormDialog";
import { Input } from "@/shared/ui/input";

import { toast } from "sonner";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

interface EditTeacherDialogProps {
  teacherId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function EditTeacherDialog({
  teacherId,
  open,
  onOpenChange,
  onSuccess,
}: EditTeacherDialogProps) {
  const [isLoadingTeacher, setIsLoadingTeacher] =
    useState(false);

  const form = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      qualification: "",
      joiningDate: "",
    },
  });

  useEffect(() => {
    if (!open || !teacherId) {
      return;
    }

    const loadTeacher = async () => {
      try {
        setIsLoadingTeacher(true);

        const teacher =
          await getTeacherById(teacherId);

        form.reset({
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          phone: teacher.phone ?? "",
          qualification: teacher.qualification,
          joiningDate:
            teacher.joiningDate.slice(0, 10),
        });
      } catch (error) {
        console.error(
          "Failed to load teacher:",
          error,
        );

        toast.error(getErrorMessage(error));

        onOpenChange(false);
      } finally {
        setIsLoadingTeacher(false);
      }
    };

    loadTeacher();
  }, [open, teacherId, form, onOpenChange]);

  const onSubmit = async (data: TeacherFormData) => {
    try {
      await updateTeacher(teacherId, data);

      toast.success(
        "Teacher updated successfully.",
      );

      setTimeout(() => {
        onOpenChange(false);
      }, 0);

      onSuccess?.();
    } catch (error) {
      console.error(
        "Failed to update teacher:",
        error,
      );

      toast.error(getErrorMessage(error));
    }
  };

  const isBusy =
    isLoadingTeacher ||
    form.formState.isSubmitting;

  return (
    <FormDialog
      title="Edit Teacher"
      description="Update teacher information."
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isBusy}
      submitLabel="Save Changes"
      submittingLabel={
        isLoadingTeacher
          ? "Loading..."
          : "Saving..."
      }
      open={open}
      onOpenChange={onOpenChange}
    >
      {isLoadingTeacher ? (
        <p className="text-sm text-muted-foreground">
          Loading teacher details...
        </p>
      ) : (
        <>
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              First Name
            </label>

            <Input
              placeholder="Enter first name"
              {...form.register("firstName")}
            />

            {form.formState.errors.firstName && (
              <p className="text-sm text-destructive">
                {
                  form.formState.errors.firstName
                    .message
                }
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Last Name
            </label>

            <Input
              placeholder="Enter last name"
              {...form.register("lastName")}
            />

            {form.formState.errors.lastName && (
              <p className="text-sm text-destructive">
                {
                  form.formState.errors.lastName
                    .message
                }
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter email"
              {...form.register("email")}
            />

            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {
                  form.formState.errors.email.message
                }
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Phone
            </label>

            <Input
              placeholder="Enter phone number"
              {...form.register("phone")}
            />

            {form.formState.errors.phone && (
              <p className="text-sm text-destructive">
                {
                  form.formState.errors.phone.message
                }
              </p>
            )}
          </div>

          {/* Qualification */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Qualification
            </label>

            <Input
              placeholder="Enter qualification"
              {...form.register("qualification")}
            />

            {form.formState.errors.qualification && (
              <p className="text-sm text-destructive">
                {
                  form.formState.errors
                    .qualification.message
                }
              </p>
            )}
          </div>

          {/* Joining Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Joining Date
            </label>

            <Input
              type="date"
              {...form.register("joiningDate")}
            />

            {form.formState.errors.joiningDate && (
              <p className="text-sm text-destructive">
                {
                  form.formState.errors
                    .joiningDate.message
                }
              </p>
            )}
          </div>
        </>
      )}
    </FormDialog>
  );
}