import { UserStatus } from "../../../auth/domain/enums/user-status.enum";

export interface TeacherDetails {
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