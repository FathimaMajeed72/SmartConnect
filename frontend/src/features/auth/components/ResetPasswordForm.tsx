import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import PasswordSetupForm from "./PasswordSetupForm";

import { resetPassword } from "../services/auth.service";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

export default function ResetPasswordForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", {
        replace: true,
      });
    }
  }, [email, navigate]);

  const handlePasswordSubmit = async (password: string) => {
    if (!email) return;

    try {
      await resetPassword(email, password);

      toast.success("Password reset successfully.");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <PasswordSetupForm
        onSubmit={handlePasswordSubmit}
        submitLabel="Reset Password"
        submittingLabel="Resetting Password..."
      />

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="text-sm text-primary hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </>
  );
}




















// import { Button } from "@/shared/ui/button";
// import { Label } from "@/shared/ui/label";
// import PasswordInput from "./PasswordInput";

// import { useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   resetPasswordSchema,
//   type ResetPasswordFormData,
// } from "../schemas/resetPassword.schema";

// import { resetPassword } from "../services/auth.service";
// import { toast } from "sonner";
// import { getErrorMessage } from "@/core/utils/getErrorMessage";

// export default function ResetPasswordForm() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const email = location.state?.email;

//   useEffect(() => {
//     if (!email) {
//       navigate("/forgot-password", {
//         replace: true,
//       });
//     }
//   }, [email, navigate]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<ResetPasswordFormData>({
//     resolver: zodResolver(resetPasswordSchema),
//     defaultValues: {
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit = async (data: ResetPasswordFormData) => {
//     if (!email) return;

//     try {
//       await resetPassword(email, data.password);

//       toast.success("Password reset successfully.");

//       navigate("/login", {
//         replace: true,
//       });
//     } catch (error) {
//       console.error(error);

//       toast.error(getErrorMessage(error));
//     }
//   };

//   return (
//     <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//       <div className="space-y-2">
//         <Label htmlFor="newPassword">New Password</Label>

//         <PasswordInput
//           id="newPassword"
//           autoComplete="new-password"
//           {...register("password")}
//           placeholder="Enter your new password"
//         />
//         {errors.password && (
//           <p className="text-sm text-destructive">{errors.password.message}</p>
//         )}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="confirmPassword">Confirm Password</Label>

//         <PasswordInput
//           id="confirmPassword"
//           autoComplete="new-password"
//           {...register("confirmPassword")}
//           placeholder="Confirm your password"
//         />
//         {errors.confirmPassword && (
//           <p className="text-sm text-destructive">
//             {errors.confirmPassword.message}
//           </p>
//         )}
//       </div>

//       <Button type="submit" className="w-full" disabled={isSubmitting}>
//         {isSubmitting ? "Resetting Password..." : "Reset Password"}
//       </Button>

//       <div className="text-center">
//         <Link to="/login" className="text-sm text-primary hover:underline">
//           Back to Login
//         </Link>
//       </div>
//     </form>
//   );
// }
