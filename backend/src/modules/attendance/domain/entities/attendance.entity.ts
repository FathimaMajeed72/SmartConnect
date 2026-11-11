import { IBaseEntity } from "../../../../shared/domain/entities/base.entity";
import { AttendanceStatus } from "../enums/attendance-status.enum";

export interface AttendanceEntity extends IBaseEntity {
  studentId: string;
  batchId: string;
  classId: string;
  date: Date;
  status: AttendanceStatus;
  markedBy: string;
  updatedBy?: string;
  remarks?: string;
  createdAt?: Date;
  updatedAt?: Date;
}