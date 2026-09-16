import { Badge } from "@/shared/ui/badge";

import {
  USER_STATUS,
  type UserStatus,
} from "@/features/admin/types/user-status";

interface TeacherStatusBadgeProps {
  status: UserStatus;
}

export default function TeacherStatusBadge({
  status,
}: TeacherStatusBadgeProps) {
  switch (status) {
    case USER_STATUS.ACTIVE:
      return <Badge>Active</Badge>;

    case USER_STATUS.INVITED:
      return <Badge variant="secondary">Invited</Badge>;

    case USER_STATUS.INACTIVE:
      return <Badge variant="outline">Inactive</Badge>;

    case USER_STATUS.BLOCKED:
      return <Badge variant="destructive">Blocked</Badge>;

    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}