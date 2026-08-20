import { Badge } from "@/shared/ui/badge";

import {
  USER_STATUS,
  type UserStatus,
} from "@/features/admin/types/user-status";

interface ParentStatusBadgeProps {
  status: UserStatus;
}

export default function ParentStatusBadge({
  status,
}: ParentStatusBadgeProps) {
  const variant =
    status === USER_STATUS.ACTIVE
      ? "default"
      : status === USER_STATUS.BLOCKED
        ? "destructive"
        : "secondary";

  return <Badge variant={variant}>{status}</Badge>;
}