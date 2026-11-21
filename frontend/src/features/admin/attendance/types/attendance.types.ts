import type { AttendanceStatus } from "@/features/teacher/attendance/types/attendance-status";

export interface GetSchoolAttendanceParams {
  date: string;
  academicYear?: string;
  classId?: string;
  batchId?: string;
}

export interface BatchAttendanceSummary {
  batchId: string;
  batchName: string;
  className: string;
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendancePercentage: number;
}

export interface SchoolAttendanceSummary {
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendancePercentage: number;
}

export interface GetSchoolAttendanceResponse {
  summary: SchoolAttendanceSummary;
  batches: BatchAttendanceSummary[];
}



export interface AdminStudentAttendance {
  studentId: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  status: AttendanceStatus | null;
  remarks?: string;
}

export interface GetAdminBatchAttendanceResponse {
  batchId: string;
  date: string;
  totalStudents: number;
  attendanceMarked: boolean;
  present: number;
  absent: number;
  late: number;
  excused: number;
  students: AdminStudentAttendance[];
}