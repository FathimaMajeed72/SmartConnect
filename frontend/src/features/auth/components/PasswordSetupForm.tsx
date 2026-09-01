import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import PasswordInput from "./PasswordInput";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  passwordSchema,
  type PasswordFormData,
} from "../schemas/password.schema";

type PasswordSetupFormProps = {
  onSubmit: (password: string) => Promise<void>;
  submitLabel: string;
  submittingLabel: string;
};

export default function PasswordSetupForm({
  onSubmit,
  submitLabel,
  submittingLabel,
}: PasswordSetupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (data: PasswordFormData) => {
    await onSubmit(data.password);
  };

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>

        <PasswordInput
          id="newPassword"
          autoComplete="new-password"
          placeholder="Enter your new password"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm Password
        </Label>

        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
}