import type { ReactNode } from "react";
import { Card, CardContent } from "@/shared/ui/card";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <Card className="border-border shadow-lg">
      <CardContent className="p-8">
        {children}
      </CardContent>
    </Card>
  );
}