import { UpdateStudentParentRequest } from "../dtos/update-student-parent.request";
import { UpdateStudentParentResponse } from "../dtos/update-student-parent.response";

export interface IUpdateStudentParentUseCase {
  execute(
    request: UpdateStudentParentRequest,
  ): Promise<UpdateStudentParentResponse>;
}