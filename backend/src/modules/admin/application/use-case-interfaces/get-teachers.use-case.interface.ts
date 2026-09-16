import { GetTeachersQuery } from "../types/get-teachers-query.type";
import { PaginatedTeachers } from "../types/get-teachers-response.type";

export interface IGetTeachersUseCase {
  execute(
    query: GetTeachersQuery,
  ): Promise<PaginatedTeachers>;
}