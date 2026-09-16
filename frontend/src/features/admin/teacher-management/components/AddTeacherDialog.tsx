import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import { teacherSchema, type TeacherFormData } from "../schemas/teacher.schema";

import { createTeacher } from "../services/teacher.service";

import FormDialog from "@/shared/components/FormDialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

import { toast } from "sonner";
import { getErrorMessage } from "@/core/utils/getErrorMessage";
import { useState } from "react";

interface AddTeacherDialogProps {
  onSuccess?: () => void;
}

export default function AddTeacherDialog({ onSuccess }: AddTeacherDialogProps) {
  const [open, setOpen] = useState(false);
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

  const onSubmit = async (data: TeacherFormData) => {
    try {
      const result = await createTeacher(data);

      toast.success("Teacher invitation sent successfully.");

      console.log("Created teacher user:", result.userId);

      form.reset();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to create teacher:", error);

      toast.error(getErrorMessage(error));
    }
  };

  return (
    <FormDialog
      trigger={
        <Button>
          <Plus />
          Add Teacher
        </Button>
      }
      title="Add Teacher"
      description="Create a new teacher account."
      onSubmit={form.handleSubmit(onSubmit)}
      isSubmitting={form.formState.isSubmitting}
      submitLabel="Add Teacher"
      submittingLabel="Adding..."
      open={open}
      onOpenChange={setOpen}
    >
      {/* First Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">First Name</label>

        <Input placeholder="Enter first name" {...form.register("firstName")} />

        {form.formState.errors.firstName && (
          <p className="text-sm text-destructive">
            {form.formState.errors.firstName.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Last Name</label>

        <Input placeholder="Enter last name" {...form.register("lastName")} />

        {form.formState.errors.lastName && (
          <p className="text-sm text-destructive">
            {form.formState.errors.lastName.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>

        <Input
          type="email"
          placeholder="Enter email"
          {...form.register("email")}
        />

        {form.formState.errors.email && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Phone</label>

        <Input placeholder="Enter phone number" {...form.register("phone")} />

        {form.formState.errors.phone && (
          <p className="text-sm text-destructive">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      {/* Qualification */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Qualification</label>

        <Input
          placeholder="Enter qualification"
          {...form.register("qualification")}
        />

        {form.formState.errors.qualification && (
          <p className="text-sm text-destructive">
            {form.formState.errors.qualification.message}
          </p>
        )}
      </div>

      {/* Joining Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Joining Date</label>

        <Input type="date" {...form.register("joiningDate")} />

        {form.formState.errors.joiningDate && (
          <p className="text-sm text-destructive">
            {form.formState.errors.joiningDate.message}
          </p>
        )}
      </div>
    </FormDialog>
  );
}
