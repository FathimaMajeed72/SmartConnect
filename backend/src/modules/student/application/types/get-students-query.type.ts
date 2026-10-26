import { StudentStatus } from "../../domain/enums/student-status.enum";

export interface GetStudentsQuery {
  page: number;
  limit: number;
  search?: string;
  status?: StudentStatus;
}