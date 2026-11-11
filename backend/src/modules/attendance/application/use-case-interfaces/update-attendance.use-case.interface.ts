import { UpdateAttendanceRequest } from "../dtos/update-attendance.request";
import { UpdateAttendanceResponse } from "../dtos/update-attendance.response";

export interface IUpdateAttendanceUseCase {
  execute(
    request: UpdateAttendanceRequest,
    userId: string,
  ): Promise<UpdateAttendanceResponse>;
}