import { MarkAttendanceRequest } from "../dtos/mark-attendance.request";
import { MarkAttendanceResponse } from "../dtos/mark-attendance.response";

export interface IMarkAttendanceUseCase {
  execute(
    request: MarkAttendanceRequest,
    userId: string,
  ): Promise<MarkAttendanceResponse>;
}