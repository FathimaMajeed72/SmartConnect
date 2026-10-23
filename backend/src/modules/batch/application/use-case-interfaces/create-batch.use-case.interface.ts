import { CreateBatchRequest } from "../dtos/create-batch.request";
import { CreateBatchResponse } from "../dtos/create-batch.response";

export interface ICreateBatchUseCase {
  execute(
    classId: string,
    request: CreateBatchRequest,
  ): Promise<CreateBatchResponse>;
}