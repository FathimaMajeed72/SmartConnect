import { GetBatchAttendanceRequest } from "../dtos/get-batch-attendance.request";
import { GetBatchAttendanceResponse } from "../dtos/get-batch-attendance.response";

export interface IGetBatchAttendanceUseCase {
  execute(
    request: GetBatchAttendanceRequest,
    userId: string,
  ): Promise<GetBatchAttendanceResponse>;
}