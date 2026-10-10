import { AssignClassSubjectRequest } from "../dtos/assign-class-subject.request";
import { AssignClassSubjectResponse } from "../dtos/assign-class-subject.response";

export interface IAssignClassSubjectUseCase {
  execute(
    classId: string,
    request: AssignClassSubjectRequest,
  ): Promise<AssignClassSubjectResponse>;
}