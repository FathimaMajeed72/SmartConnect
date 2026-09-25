import { ClassDetails } from "./get-class-response.type";

export interface GetClassesResponse {
  classes: ClassDetails[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}