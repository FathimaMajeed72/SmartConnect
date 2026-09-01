import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";

import PasswordInput from "./PasswordInput";

import {
  activateAccountSchema,
  type ActivateAccountFormData,
} from "../schemas/activateAccount.schema";

import { activateAccount } from "../services/auth.service";

import { getErrorMessage } from "@/core/utils/getErrorMessage";

interface ActivateAccountFormProps {
  token: string;
}

export default function ActivateAccountForm({
  token,
}: ActivateAccountFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActivateAccountFormData>({
    resolver: zodResolver(activateAccountSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ActivateAccountFormData) => {
    try {
      await activateAccount({
        token,
        password: data.password,
      });

      toast.success("Account activated successfully.");

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* New Password */}
      <div className="space-y-1.5">
        <Label htmlFor="password">New Password</Label>

        <PasswordInput
          id="password"
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

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword">
          Confirm Password
        </Label>

        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="Confirm your new password"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Activating..." : "Activate Account"}
      </Button>
    </form>
  );
}