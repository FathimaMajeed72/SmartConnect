import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";

export interface MarkAttendanceRequest {
  batchId: string;
  date: Date;
  attendance: {
    studentId: string;
    status: AttendanceStatus;
    remarks?: string;
  }[];
}