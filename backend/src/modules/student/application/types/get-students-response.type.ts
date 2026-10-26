import { StudentDetails } from "./get-student-response.type";

export interface GetStudentsResponse {
  students: StudentDetails[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}