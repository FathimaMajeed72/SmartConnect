import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Link } from "react-router-dom";

export default function ForgotPasswordForm() {
  return (
    <form noValidate className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
        />
      </div>

      <Button className="w-full">
        Send OTP
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