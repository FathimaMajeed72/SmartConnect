import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "@/features/landing/pages/LandingPage";
import PublicLayout from "@/shared/layouts/PublicLayout";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
