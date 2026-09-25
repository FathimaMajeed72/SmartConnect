import { ClassStatus } from "../../domain/enums/class-status.enum";

export interface GetClassesQuery {
  page: number;
  limit: number;
  search?: string;
  status?: ClassStatus;
}