export type AttendanceStatus =
  | "PRESENT"
  | "ABSENT"
  | "LATE"
  | "EXCUSED";

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
  date: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface ParentAttendanceResponse {
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

export interface GetParentAttendanceParams {
  studentId: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}