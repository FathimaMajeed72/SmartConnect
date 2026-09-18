import { UpdateTeacherStatusRequest } from "../dtos/update-teacher-status.request";
import { UpdateTeacherStatusResponse } from "../dtos/update-teacher-status.response";

export interface IUpdateTeacherStatusUseCase {
  execute(
    id: string,
    request: UpdateTeacherStatusRequest,
  ): Promise<UpdateTeacherStatusResponse>;
}