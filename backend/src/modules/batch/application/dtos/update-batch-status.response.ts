import { BatchStatus } from "../../domain/enums/batch-status.enum";


export interface UpdateBatchStatusResponse {
  batchId: string;
  status: BatchStatus;
}