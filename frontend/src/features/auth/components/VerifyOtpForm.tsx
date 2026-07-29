import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Link } from "react-router-dom";

export default function VerifyOtpForm() {
  return (
    <form noValidate className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="otp">Verification Code</Label>

        <Input
          id="otp"
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter 6-digit OTP"
        />
      </div>

      <Button type="submit" className="w-full">
        Verify OTP
      </Button>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          className="text-primary hover:underline"
        >
          Resend OTP
        </button>

        <Link
          to="/login"
          className="text-primary hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
}