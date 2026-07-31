import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
import PasswordInput from "./PasswordInput";
import { Link } from "react-router-dom";
import GoogleButton from "./GoogleButton";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { login } from "../services/auth.service";

export default function LoginForm() {
  const isLoading = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form noValidate className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoFocus
          autoComplete="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Label
          htmlFor="remember"
          className="flex items-center gap-2 cursor-pointer font-normal"
        >
          <Checkbox id="remember" />
          Remember me
        </Label>

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
