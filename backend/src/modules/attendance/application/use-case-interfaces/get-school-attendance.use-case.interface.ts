import { GetSchoolAttendanceRequest } from "../dtos/get-school-attendance.request";
import { GetSchoolAttendanceResponse } from "../dtos/get-school-attendance.response";

export interface IGetSchoolAttendanceUseCase {
  execute(
    request: GetSchoolAttendanceRequest,
  ): Promise<GetSchoolAttendanceResponse>;
}