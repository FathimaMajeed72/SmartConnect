import type { UserStatus } from "../../types/user-status";

export interface TeacherListItem {
  id: string;

  teacherId: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string | null;

  qualification: string;

  joiningDate: string;

  status: UserStatus;
}

export interface PaginatedTeachers {
  teachers: TeacherListItem[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}

export interface GetTeachersParams {
  page?: number;

  limit?: number;

  search?: string;

  status?: UserStatus;
}

export interface CreateTeacherRequest {
  firstName: string;

  lastName: string;

  email: string;

  phone?: string;

  qualification: string;

  joiningDate: string;
}

export interface CreateTeacherResponse {
  message: string;
  userId: string;
}