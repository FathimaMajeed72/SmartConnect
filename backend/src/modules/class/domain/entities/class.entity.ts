import { ClassStatus } from "../enums/class-status.enum";

export interface ClassEntity {
  id: string;
  name: string;
  code: string;
  academicYear: string;
  description?: string;
  status: ClassStatus;
  createdAt: Date;
  updatedAt: Date;
}