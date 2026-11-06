import { UnassignStudentsFromBatchRequest } from "../dtos/unassign-students-from-batch.request";
import { UnassignStudentsFromBatchResponse } from "../dtos/unassign-students-from-batch.response";

export interface IUnassignStudentsFromBatchUseCase {
  execute(
    request: UnassignStudentsFromBatchRequest,
  ): Promise<UnassignStudentsFromBatchResponse>;
}