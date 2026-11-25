import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";

export interface ParentAttendanceSummary {
  present: number;
  absent: number;
  late: number;
  excused: number;
  totalAttendanceDays: number;
  attendedDays: number;
  attendancePercentage: number;
}

export interface ParentAttendanceRecord {
  id: string;
  date: Date;
  status: AttendanceStatus;
  remarks?: string;
}

export interface GetParentAttendanceResponse {
  studentId: string;
  summary: ParentAttendanceSummary;
  attendance: ParentAttendanceRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}