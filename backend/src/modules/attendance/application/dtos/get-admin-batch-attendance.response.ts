import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";

export interface AdminStudentAttendanceDto {
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
  students: AdminStudentAttendanceDto[];
}