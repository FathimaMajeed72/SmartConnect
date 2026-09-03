import { GetParentsQuery } from "../types/get-parents-query.type";
import { PaginatedParents } from "../types/get-parents-response.type";

export interface IGetParentsUseCase {
  execute(query: GetParentsQuery): Promise<PaginatedParents>;
}