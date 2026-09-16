import { AddTeacherRequest } from "../dtos/add-teacher.request";
import { AddTeacherResponse } from "../dtos/add-teacher.response";

export interface IAddTeacherUseCase {
  execute(
    request: AddTeacherRequest,
  ): Promise<AddTeacherResponse>;
}