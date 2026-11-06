import { AssignStudentsToBatchRequest } from "../dtos/assign-students-to-batch.request";

export interface IAssignStudentsToBatchUseCase {
  execute(request: AssignStudentsToBatchRequest): Promise<void>;
}