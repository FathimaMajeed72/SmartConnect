import { UpdateStudentParentStatusRequest } from "../dtos/update-student-parent-status.request";
import { UpdateStudentParentStatusResponse } from "../dtos/update-student-parent-status.response";

export interface IUpdateStudentParentStatusUseCase {
  execute(
    request: UpdateStudentParentStatusRequest,
  ): Promise<UpdateStudentParentStatusResponse>;
}