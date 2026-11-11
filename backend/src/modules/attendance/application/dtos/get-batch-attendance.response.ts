import { AttendanceStatus } from "../../domain/enums/attendance-status.enum";

export interface GetBatchAttendanceResponse {
  batchId: string;
  date: string;
  totalStudents: number;
  attendanceMarked: boolean;

  students: {
    studentId: string;
    admissionNumber: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
    status: AttendanceStatus | null;
    remarks?: string;
  }[];
}