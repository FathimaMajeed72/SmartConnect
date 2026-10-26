import { UpdateStudentStatusRequest } from "../dtos/update-student-status.request";
import { UpdateStudentStatusResponse } from "../dtos/update-student-status.response";

export interface IUpdateStudentStatusUseCase {
  execute(
    request: UpdateStudentStatusRequest,
  ): Promise<UpdateStudentStatusResponse>;
}