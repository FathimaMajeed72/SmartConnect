import { SubjectStatus } from "../enums/subject-status.enum";

export interface SubjectEntity {
  id: string;
  name: string;
  code: string;
  status: SubjectStatus;
  createdAt: Date;
  updatedAt: Date;
}