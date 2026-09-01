import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import PasswordSetupForm from "../components/PasswordSetupForm";
import { activateAccount } from "../services/auth.service";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

export default function ActivateAccountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold">
          Invalid Invitation
        </h1>

        <p className="text-muted-foreground">
          This invitation link is invalid or incomplete.
        </p>

        <Link
          to="/login"
          className="text-sm font-medium text-primary hover:underline"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const handlePasswordSubmit = async (password: string) => {
    try {
      await activateAccount({
        token,
        password,
      });

      toast.success("Account activated successfully.");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">
          Accept Invitation
        </h1>

        <p className="text-sm text-muted-foreground">
          Set your password to activate your SmartConnect account.
        </p>
      </div>

      <PasswordSetupForm
        onSubmit={handlePasswordSubmit}
        submitLabel="Activate Account"
        submittingLabel="Activating..."
      />
    </div>
  );
}








// import { Link, useSearchParams } from "react-router-dom";

// import ActivateAccountForm from "../components/ActivateAccountForm";

// export default function ActivateAccountPage() {
//   const [searchParams] = useSearchParams();

//   const token = searchParams.get("token");

//   if (!token) {
//     return (
//       <div className="text-center space-y-4">
//         <h1 className="text-2xl font-semibold">
//           Invalid Invitation
//         </h1>

//         <p className="text-muted-foreground">
//           This invitation link is invalid or incomplete.
//         </p>

//         <Link
//           to="/login"
//           className="text-sm font-medium text-primary hover:underline"
//         >
//           Go to Login
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="space-y-2 text-center">
//         <h1 className="text-2xl font-semibold">
//           Accept Invitation
//         </h1>

//         <p className="text-sm text-muted-foreground">
//           Set your password to activate your SmartConnect account.
//         </p>
//       </div>

//       <ActivateAccountForm token={token} />
//     </div>
//   );
// }