import { CreateSubjectRequest } from "../dtos/create-subject.request";
import { CreateSubjectResponse } from "../dtos/create-subject.response";

export interface ICreateSubjectUseCase {
  execute(
    request: CreateSubjectRequest
  ): Promise<CreateSubjectResponse>;
}