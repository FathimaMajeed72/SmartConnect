import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  parentSchema,
  type ParentFormData,
} from "../schemas/parent.schema";

import {
  getParentById,
  updateParent,
} from "../services/parent.service";

import FormDialog from "@/shared/components/FormDialog";
import { Input } from "@/shared/ui/input";

import { toast } from "sonner";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

interface EditParentDialogProps {
  parentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function EditParentDialog({
  parentId,
  open,
  onOpenChange,
  onSuccess,
}: EditParentDialogProps) {
  const [isLoadingParent, setIsLoadingParent] =
    useState(false);

  const form = useForm<ParentFormData>({
    resolver: zodResolver(parentSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (!open || !parentId) {
      return;
    }

    const loadParent = async () => {
      try {
        setIsLoadingParent(true);

        const parent =
          await getParentById(parentId);

        form.reset({
          firstName: parent.firstName,
          lastName: parent.lastName,
          email: parent.email,
          phone: parent.phone ?? "",
        });
      } catch (error) {
        console.error(
          "Failed to load parent:",
          error,
        );

        toast.error(getErrorMessage(error));

        onOpenChange(false);
      } finally {
        setIsLoadingParent(false);
      }
    };

    loadParent();
  }, [open, parentId, form, onOpenChange]);

  const onSubmit = async (data: ParentFormData) => {
    try {
      await updateParent(parentId, data);

      toast.success(
        "Parent updated successfully.",
      );

      setTimeout(() => {
        onOpenChange(false);
      }, 0);

      onSuccess?.();
    } catch (error) {
      console.error(
        "Failed to update parent:",
        error,
      );

      toast.error(getErrorMessage(error));
    }
  };

  const isBusy =
    isLoadingParent ||
    form.formState.isSubmitting;

  return (
    <FormDialog
      title="Edit Parent"
      description="Update parent information."
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={isBusy}
      submitLabel="Save Changes"
      submittingLabel={
        isLoadingParent
          ? "Loading..."
          : "Saving..."
      }
      open={open}
      onOpenChange={onOpenChange}
    >
      {isLoadingParent ? (
        <p className="text-sm text-muted-foreground">
          Loading parent details...
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
                  form.formState.errors.email
                    .message
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
                  form.formState.errors.phone
                    .message
                }
              </p>
            )}
          </div>
        </>
      )}
    </FormDialog>
  );
}