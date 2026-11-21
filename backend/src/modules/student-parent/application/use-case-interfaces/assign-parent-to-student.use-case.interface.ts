import { AssignParentToStudentRequest } from "../dtos/assign-parent-to-student.request";
import { AssignParentToStudentResponse } from "../dtos/assign-parent-to-student.response";

export interface IAssignParentToStudentUseCase {
  execute(request: AssignParentToStudentRequest): Promise<AssignParentToStudentResponse>;
}
