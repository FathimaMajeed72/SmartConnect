import { AdminRepository } from "../../domain/repositories/admin.repository";

import { GetParentsQuery } from "../types/get-parents-query.type";
import { PaginatedParents } from "../types/get-parents-response.type";


export class GetParentsUseCase {
  constructor(
    private readonly adminRepository: AdminRepository,
  ) {}

  async execute(
    query: GetParentsQuery,
  ): Promise<PaginatedParents> {
    return this.adminRepository.getParents(query);
  }
}