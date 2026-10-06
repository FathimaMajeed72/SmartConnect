import { Badge } from "@/shared/ui/badge";

import type { SubjectStatus } from "../types/subject-status";

interface SubjectStatusBadgeProps {
  status: SubjectStatus;
}

export default function SubjectStatusBadge({
  status,
}: SubjectStatusBadgeProps) {
  if (status === "ACTIVE") {
    return (
      <Badge variant="default">
        Active
      </Badge>
    );
  }

  return (
    <Badge variant="secondary">
      Inactive
    </Badge>
  );
}