export interface MarkAttendanceResponse {
  batchId: string;
  date: Date;
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  submittedAt: Date;
}