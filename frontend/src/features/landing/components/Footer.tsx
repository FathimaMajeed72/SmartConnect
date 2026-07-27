import Container from "@/shared/components/Container";
import Logo from "@/shared/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t bg-background py-8">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo />

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SmartConnect. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}