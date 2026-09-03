import { GetParentsQuery } from "../../application/types/get-parents-query.type";
import { PaginatedParents } from "../../application/types/get-parents-response.type";

export interface IAdminRepository {
  getParents(
    query: GetParentsQuery
  ): Promise<PaginatedParents>;
}