import { GetStudentAttendanceSummaryRequest } from "../dtos/get-student-attendance-summary.request";
import { GetStudentAttendanceSummaryResponse } from "../dtos/get-student-attendance-summary.response";

export interface IGetStudentAttendanceSummaryUseCase {
  execute(
    request: GetStudentAttendanceSummaryRequest,
    userId: string,
  ): Promise<GetStudentAttendanceSummaryResponse>;
}