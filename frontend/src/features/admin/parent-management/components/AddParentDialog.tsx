import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import { parentSchema, type ParentFormData } from "../schemas/parent.schema";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { createParent } from "../services/parent.service";

interface AddParentDialogProps {
  onSuccess?: () => void;
}

export default function AddParentDialog({
  onSuccess,
}: AddParentDialogProps) {
  const form = useForm<ParentFormData>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

const onSubmit = async (data: ParentFormData) => {
  try {
    await createParent(data);

    form.reset();
    onSuccess?.();
  } catch (error) {
    console.error("Failed to create parent:", error);
  }
};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Parent
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Parent</DialogTitle>

          <DialogDescription>
            Create a new parent account.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
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
                {form.formState.errors.firstName.message}
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
                {form.formState.errors.lastName.message}
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
                {form.formState.errors.email.message}
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
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">
              Add Parent
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}