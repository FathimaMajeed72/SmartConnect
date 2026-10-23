import { BatchStatus } from "../../domain/enums/batch-status.enum";

export interface BatchListItem {
  id: string;
  name: string;
  classTeacherId: string | null;
  classTeacherName: string;
  capacity: number;
  status: BatchStatus;
}