import { StudentParentStatus } from "../../domain/enums/student-parent-status.enum";

export interface UpdateStudentParentStatusRequest {
  studentId: string;
  parentUserId: string;
  status: StudentParentStatus;
}