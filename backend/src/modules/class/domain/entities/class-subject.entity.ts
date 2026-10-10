import { IBaseEntity } from "../../../../shared/domain/entities/base.entity";
import { ClassSubjectStatus } from "../enums/class-subject-status.enum";

export interface ClassSubjectEntity extends IBaseEntity {
  classId: string;
  subjectId: string;
  teacherId: string;
  status: ClassSubjectStatus;
  createdAt: Date;
  updatedAt: Date;
}