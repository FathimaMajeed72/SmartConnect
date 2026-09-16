import { UserStatus } from "../../../auth/domain/enums/user-status.enum";

export interface TeacherListItem {
  id: string;
  teacherId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  qualification: string;
  joiningDate: Date;
  status: UserStatus;
}

export interface PaginatedTeachers {
  teachers: TeacherListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
