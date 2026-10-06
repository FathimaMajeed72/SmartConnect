import { SubjectDetails } from "./get-subject-response.type";

export interface GetSubjectsResponse {
  subjects: SubjectDetails[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}