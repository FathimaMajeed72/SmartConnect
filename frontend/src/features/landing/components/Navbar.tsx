import Logo from "@/shared/components/Logo";
import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </header>
  );
}