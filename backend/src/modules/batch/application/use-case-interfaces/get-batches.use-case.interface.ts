import { GetBatchesResponse } from "../dtos/get-batches.response";

export interface IGetBatchesUseCase {
  execute(classId: string): Promise<GetBatchesResponse>;
}