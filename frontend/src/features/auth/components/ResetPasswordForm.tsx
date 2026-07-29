import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import PasswordInput from "./PasswordInput";

export default function ResetPasswordForm() {
  return (
    <form noValidate className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="newPassword">
          New Password
        </Label>

        <PasswordInput
          id="newPassword"
          autoComplete="new-password"
          placeholder="Enter your new password"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm Password
        </Label>

        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          placeholder="Confirm your password"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
      >
        Reset Password
      </Button>
    </form>
  );
}