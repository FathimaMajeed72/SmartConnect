import { UpdateSubjectStatusRequest } from "../dtos/update-subject-status.request";
import { UpdateSubjectStatusResponse } from "../dtos/update-subject-status.response";

export interface IUpdateSubjectStatusUseCase {
  execute(
    id: string,
    request: UpdateSubjectStatusRequest,
  ): Promise<UpdateSubjectStatusResponse>;
}