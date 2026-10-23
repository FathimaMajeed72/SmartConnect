import { BatchStatus } from "../../domain/enums/batch-status.enum";

export interface UpdateBatchStatusRequest {
  status: BatchStatus;
  classTeacherId?: string;
}