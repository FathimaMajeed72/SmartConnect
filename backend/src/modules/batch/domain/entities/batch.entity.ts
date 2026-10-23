import { IBaseEntity } from "../../../../shared/domain/entities/base.entity";
import { BatchStatus } from "../enums/batch-status.enum";

export interface BatchEntity extends IBaseEntity {
  name: string;
  classId: string;
  classTeacherId: string | null;
  capacity: number;
  status: BatchStatus;
  createdAt: Date;
  updatedAt: Date;
}