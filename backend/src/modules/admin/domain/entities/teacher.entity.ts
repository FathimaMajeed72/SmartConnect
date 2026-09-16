import { IBaseEntity } from "../../../../shared/domain/entities/base.entity";

export interface Teacher extends IBaseEntity {
  userId: string;
  teacherId: string;
  qualification: string;
  joiningDate: Date;
  createdAt: Date;
  updatedAt: Date;
}