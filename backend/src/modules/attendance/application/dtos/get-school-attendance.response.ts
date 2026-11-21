export interface BatchAttendanceSummaryDto {
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

export interface SchoolAttendanceSummaryDto {
  totalStudents: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendancePercentage: number;
}

export interface GetSchoolAttendanceResponse {
  summary: SchoolAttendanceSummaryDto;
  batches: BatchAttendanceSummaryDto[];
}