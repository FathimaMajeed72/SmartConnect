import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthLayout from "../components/AuthLayout";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Reset Password"
          description="Create a new password for your account."
        />

        <ResetPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}