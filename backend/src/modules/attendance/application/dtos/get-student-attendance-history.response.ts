import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";

export interface GetStudentAttendanceHistoryResponse {
  studentId: string;
  attendance: {
    attendanceId: string;
    date: Date;
    status: AttendanceStatus;
    remarks?: string;
  }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
