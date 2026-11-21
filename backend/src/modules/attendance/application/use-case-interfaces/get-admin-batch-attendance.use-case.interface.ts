import { GetAdminBatchAttendanceRequest } from "../dtos/get-admin-batch-attendance.request";
import { GetAdminBatchAttendanceResponse } from "../dtos/get-admin-batch-attendance.response";

export interface IGetAdminBatchAttendanceUseCase {
  execute(
    request: GetAdminBatchAttendanceRequest,
  ): Promise<GetAdminBatchAttendanceResponse>;
}