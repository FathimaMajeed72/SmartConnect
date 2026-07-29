import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
import PasswordInput from "./PasswordInput";
import { Link } from "react-router-dom";
import GoogleButton from "./GoogleButton";

export default function LoginForm() {
  const isLoading = false;

  return (
    <form noValidate className="space-y-5">
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" autoComplete="email" placeholder="Enter your email" />
        {/* Validation error to be added here*/}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput id="password" name="password" autoComplete="current-password" placeholder="Enter your password" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label
            htmlFor="remember"
            className="text-sm font-normal cursor-pointer"
          >
            Remember me
          </Label>
        </div>

        <Link
          to="/forgot-password"
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>

      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground uppercase">Or</span>
        <Separator className="flex-1" />
      </div>

      <GoogleButton />
    </form>
  );
}
