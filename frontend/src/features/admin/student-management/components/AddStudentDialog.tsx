import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import {
  createStudentSchema,
  type CreateStudentFormData,
} from "../schemas/student.schema";

import { useCreateStudent } from "../hooks/useCreateStudent";

import FormDialog from "@/shared/components/FormDialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { toast } from "sonner";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

interface AddStudentDialogProps {
  onSuccess?: () => void;
}

export default function AddStudentDialog({
  onSuccess,
}: AddStudentDialogProps) {
  const [open, setOpen] = useState(false);
  const createStudentMutation = useCreateStudent();

  const form = useForm<CreateStudentFormData>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      admissionNumber: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "OTHER",
      profileImage: "",
    },
  });

  const onSubmit = async (data: CreateStudentFormData) => {
    try {
      await createStudentMutation.mutateAsync(data);

      form.reset();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create student:", error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <FormDialog
      trigger={
        <Button>
          <Plus />
          Add Student
        </Button>
      }
      title="Add Student"
      description="Enter the student's details to register a new student."
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={
        form.formState.isSubmitting || createStudentMutation.isPending
      }
      submitLabel="Add Student"
      submittingLabel="Adding..."
      open={open}
      onOpenChange={setOpen}
    >
      {/* Admission Number */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Admission Number</label>

        <Input
          placeholder="Enter admission number"
          {...form.register("admissionNumber")}
        />

        {form.formState.errors.admissionNumber && (
          <p className="text-sm text-destructive">
            {form.formState.errors.admissionNumber.message}
          </p>
        )}
      </div>

      {/* First Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">First Name</label>

        <Input
          placeholder="Enter first name"
          {...form.register("firstName")}
        />

        {form.formState.errors.firstName && (
          <p className="text-sm text-destructive">
            {form.formState.errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Last Name</label>

        <Input
          placeholder="Enter last name"
          {...form.register("lastName")}
        />

        {form.formState.errors.lastName && (
          <p className="text-sm text-destructive">
            {form.formState.errors.lastName.message}
          </p>
        )}
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Date of Birth</label>

        <Input type="date" {...form.register("dateOfBirth")} />

        {form.formState.errors.dateOfBirth && (
          <p className="text-sm text-destructive">
            {form.formState.errors.dateOfBirth.message}
          </p>
        )}
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Gender</label>

        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...form.register("gender")}
        >
          <option value="OTHER">Select gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        {form.formState.errors.gender && (
          <p className="text-sm text-destructive">
            {form.formState.errors.gender.message}
          </p>
        )}
      </div>
    </FormDialog>
  );
}
