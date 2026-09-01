import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { refreshSession } from "@/features/auth/services/auth.service";
import { setCredentials } from "@/features/auth/slices/authSlice";

import type { AppDispatch } from "@/app/store/store";

type Props = {
  children: React.ReactNode;
};

export default function AuthInitializer({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const data = await refreshSession();

        dispatch(setCredentials(data));
      } catch(error) {
        // User is not logged in or refresh token is invalid.
        console.error("AUTH INITIALIZATION FAILED:", error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}