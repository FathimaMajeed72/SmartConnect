import { BatchStatus } from "../../../batch/domain/enums/batch-status.enum";

export interface GetMyBatchResponse {
  batchId: string;
  batchName: string;
  classId: string;
  className: string;
  classTeacherId: string;
  status: BatchStatus;
}