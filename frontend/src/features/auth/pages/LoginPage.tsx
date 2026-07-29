import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Welcome Back"
          description="Sign in to continue to SmartConnect."
        />

        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}