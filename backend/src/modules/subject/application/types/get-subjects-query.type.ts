import { SubjectStatus } from "../../domain/enums/subject-status.enum";

export interface GetSubjectsQuery {
  page: number;
  limit: number;
  search?: string;
  status?: SubjectStatus;
}