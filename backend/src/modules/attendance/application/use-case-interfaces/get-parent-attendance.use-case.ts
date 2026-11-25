import { GetParentAttendanceRequest } from "../dtos/get-parent-attendance.request";
import { GetParentAttendanceResponse } from "../dtos/get-parent-attendance.response";

export interface IGetParentAttendanceUseCase {
  execute(
    request: GetParentAttendanceRequest,
    parentUserId: string,
  ): Promise<GetParentAttendanceResponse>;
}