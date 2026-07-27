import Footer from "@/features/landing/components/Footer";
import Navbar from "@/features/landing/components/Navbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}