import { Badge } from "@/shared/ui/badge";

import type { StudentStatus } from "../types/student-status";

interface StudentStatusBadgeProps {
  status: StudentStatus;
}

export default function StudentStatusBadge({
  status,
}: StudentStatusBadgeProps) {
  const variant = status === "ACTIVE" ? "default" : "secondary";

  return <Badge variant={variant}>{status}</Badge>;
}
