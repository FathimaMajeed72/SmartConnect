import Container from "@/shared/components/Container";
import Logo from "@/shared/components/Logo";
import { Button } from "@/shared/ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">

        <Link to="/">
          <Logo />
        </Link>

        <Link to="/login">
          <Button>Login</Button>
        </Link>

      </Container>
    </header>
  );
}