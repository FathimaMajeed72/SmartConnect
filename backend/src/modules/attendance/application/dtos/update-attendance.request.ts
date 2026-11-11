import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";

export interface UpdateAttendanceRequest {
  batchId: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  remarks?: string;
}