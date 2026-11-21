

export interface GetStudentAttendanceHistoryRequest {
  studentId: string;
  startDate?: string;
  endDate?: string;
  page: number;
  limit: number;
}