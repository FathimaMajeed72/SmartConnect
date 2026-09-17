import type { UserStatus } from "../../types/user-status";


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

export interface GetParentsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: UserStatus;
}

export interface CreateParentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface CreateParentResponse {
  userId: string;
}