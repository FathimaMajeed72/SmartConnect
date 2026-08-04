import { UserStatus } from "../../../auth/domain/enums/user-status.enum";


export interface ParentListItem {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string | null;

  status: UserStatus;
}

export interface PaginatedParents {
  parents: ParentListItem[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}