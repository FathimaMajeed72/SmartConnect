import { GetBatchResponse } from "../dtos/get-batch-response";

export interface IGetBatchUseCase {
  execute(classId: string, batchId: string): Promise<GetBatchResponse>;
}
