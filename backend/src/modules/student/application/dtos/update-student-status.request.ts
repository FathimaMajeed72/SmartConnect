import { StudentStatus } from "../../domain/enums/student-status.enum";

export interface UpdateStudentStatusRequest {
  id: string;
  status: StudentStatus;
}