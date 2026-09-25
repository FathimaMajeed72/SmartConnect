import { ClassStatus } from "../../domain/enums/class-status.enum";

export interface ClassDetails {
  id: string;
  name: string;
  code: string;
  description?: string;
  status: ClassStatus;
  createdAt: Date;
  updatedAt: Date;
}