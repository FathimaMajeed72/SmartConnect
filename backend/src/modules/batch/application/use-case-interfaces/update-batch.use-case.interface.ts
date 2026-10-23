import { UpdateBatchRequest } from "../dtos/update-batch.request";
import { UpdateBatchResponse } from "../dtos/update-batch.response";

export interface IUpdateBatchUseCase {
  execute(
    classId: string,
    batchId: string,
    request: UpdateBatchRequest,
  ): Promise<UpdateBatchResponse>;
}