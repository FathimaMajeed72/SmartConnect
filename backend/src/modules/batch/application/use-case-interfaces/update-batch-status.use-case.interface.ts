import { UpdateBatchStatusRequest } from "../dtos/update-batch-status.request"; 
import { UpdateBatchStatusResponse } from "../dtos/update-batch-status.response";

export interface IUpdateBatchStatusUseCase {
  execute(
    classId: string,
    batchId: string,
    request: UpdateBatchStatusRequest,
  ): Promise<UpdateBatchStatusResponse>;
}