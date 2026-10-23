import { BatchStatus } from "../../domain/enums/batch-status.enum";

export interface BatchDetails {
  id: string;
  name: string;
  classId: string;
  classTeacherId: string | null;
  capacity: number;
  status: BatchStatus;
  createdAt: Date;
  updatedAt: Date;
}

