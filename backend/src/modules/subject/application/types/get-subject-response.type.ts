import { SubjectStatus } from "../../domain/enums/subject-status.enum";

export interface SubjectDetails {
  id: string;
  name: string;
  code: string;
  status: SubjectStatus;
  createdAt: Date;
  updatedAt: Date;
}