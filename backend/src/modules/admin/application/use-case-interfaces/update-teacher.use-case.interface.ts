import { UpdateTeacherRequest } from "../dtos/update-teacher.request";
import { UpdateTeacherResponse } from "../dtos/update-teacher.response";

export interface IUpdateTeacherUseCase {
  execute(
    id: string,
    request: UpdateTeacherRequest,
  ): Promise<UpdateTeacherResponse>;
}