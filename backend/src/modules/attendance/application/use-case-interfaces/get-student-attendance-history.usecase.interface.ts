import { GetStudentAttendanceHistoryRequest } from "../dtos/get-student-attendance-history.request";
import { GetStudentAttendanceHistoryResponse } from "../dtos/get-student-attendance-history.response";

export interface IGetStudentAttendanceHistoryUseCase {
  execute(
    request: GetStudentAttendanceHistoryRequest,
    userId: string,
  ): Promise<GetStudentAttendanceHistoryResponse>;
}
