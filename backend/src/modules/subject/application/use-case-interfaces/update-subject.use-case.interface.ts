import { UpdateSubjectRequest } from "../dtos/update-subject.request";
import { UpdateSubjectResponse } from "../dtos/update-subject.response";

export interface IUpdateSubjectUseCase {
  execute(
    id: string,
    request: UpdateSubjectRequest,
  ): Promise<UpdateSubjectResponse>;
}