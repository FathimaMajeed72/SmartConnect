import { CreateStudentRequest } from "../dtos/create-student.request";
import { CreateStudentResponse } from "../dtos/create-student.response";

export interface ICreateStudentUseCase {
  execute(
    request: CreateStudentRequest,
  ): Promise<CreateStudentResponse>;
}