
export interface GetStudentAttendanceSummaryResponse {
  studentId: string;
  present: number;
  absent: number;
  late: number;
  excused: number;
  totalAttendanceDays: number;
  attendedDays: number;
  attendancePercentage: number;
}