import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthLayout from "../components/AuthLayout";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Forgot Password"
          description="Enter your email address to receive a verification code."
        />

        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}