import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthLayout from "../components/AuthLayout";
import VerifyOtpForm from "../components/VerifyOtpForm";

export default function VerifyOtpPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Verify OTP"
          description="Enter the verification code sent to your email."
        />

        <VerifyOtpForm />
      </AuthCard>
    </AuthLayout>
  );
}