import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Link, useNavigate } from "react-router-dom";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/forgotPassword.schema";
import { forgotPassword } from "../services/auth.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data.email);

      toast.success("OTP sent successfully.");

      navigate("/verify-otp", {
        state: {
          email: data.email,
        },
      });
    } catch (error) {
      console.error(error);
      
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          autoFocus
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending OTP..." : "Send OTP"}
      </Button>

      <Link
        to="/login"
        className="block text-center text-sm text-primary hover:underline"
      >
        Back to Login
      </Link>
    </form>
  );
}
