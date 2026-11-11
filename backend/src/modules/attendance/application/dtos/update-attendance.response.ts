import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";

export interface UpdateAttendanceResponse {
  attendanceId: string;
  studentId: string;
  batchId: string;
  date: string;
  status: AttendanceStatus;
  remarks?: string;
  updatedBy: string;
  updatedAt: Date;
}