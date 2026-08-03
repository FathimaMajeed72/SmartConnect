import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from "../schemas/verifyOtp.schema";
import { useForm } from "react-hook-form";
import { resendOtp, verifyResetOtp } from "../services/auth.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

export default function VerifyOtpForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const RESEND_DELAY = 60;

  const [secondsLeft, setSecondsLeft] = useState(RESEND_DELAY);

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: VerifyOtpFormData) => {
    if (!email) return;
    try {
      await verifyResetOtp(email, data.otp);

      toast.success("OTP verified successfully.");

      navigate("/reset-password", {
        state: {
          email,
        },
      });
    } catch (error) {
      console.error(error);

      toast.error(getErrorMessage(error));
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;
    try {
      await resendOtp(email);

      toast.success("OTP resent successfully.");

      setSecondsLeft(RESEND_DELAY);
    } catch (error) {
      console.error(error);

      toast.error(getErrorMessage(error));
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-sm text-muted-foreground">Verification code sent to</p>

      <p className="font-medium">{email}</p>

      <div className="space-y-2">
        <Label htmlFor="otp">Verification Code</Label>

        <Input
          id="otp"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter 6-digit OTP"
          {...register("otp")}
        />
        {errors.otp && (
          <p className="text-sm text-destructive">{errors.otp.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Verifying..." : "Verify OTP"}
      </Button>

      <div className="flex items-center justify-between text-sm">
        <Button
          type="button"
          variant="link"
          className="p-0"
          onClick={handleResendOtp}
          disabled={secondsLeft > 0}
        >
          {secondsLeft > 0
            ? `Resend OTP in ${formatTime(secondsLeft)}`
            : "Resend OTP"}
        </Button>

        <Link to="/login" className="text-primary hover:underline">
          Back to Login
        </Link>
      </div>
    </form>
  );
}
