export interface GetParentAttendanceRequest {
  studentId: string;
  startDate?: string;
  endDate?: string;
  page: number;
  limit: number;
}