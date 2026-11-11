import { GetMyBatchResponse } from "../dtos/get-my-batch.response";

export interface IGetMyBatchUseCase {
  execute(userId: string): Promise<GetMyBatchResponse>;
}