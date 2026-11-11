import type { BatchStatus } from "@/features/admin/batch-management/types/batch.status";
import type { AttendanceStatus } from "./attendance-status";

export interface GetMyBatchResponse {
  batchId: string;
  batchName: string;
  classId: string;
  className: string;
  classTeacherId: string;
  status: BatchStatus;
}

export interface AttendanceStudent {
  studentId: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  status: AttendanceStatus | null;
  remarks?: string;
}

export interface GetBatchAttendanceResponse {
  batchId: string;
  date: string;
  totalStudents: number;
  attendanceMarked: boolean;
  students: AttendanceStudent[];
}

export interface MarkAttendanceRequest {
  batchId: string;
  date: string;
  attendance: {
    studentId: string;
    status: AttendanceStatus;
    remarks?: string;
  }[];
}

export interface MarkAttendanceResponse {
  batchId: string;
  date: string;
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  submittedAt: Date;
}

export interface UpdateAttendanceRequest {
  batchId: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  remarks?: string;
}

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