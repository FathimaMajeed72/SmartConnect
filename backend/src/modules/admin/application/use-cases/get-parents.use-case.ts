import { IAdminRepository } from "../../domain/repositories/admin.repository";

import { GetParentsQuery } from "../types/get-parents-query.type";
import { PaginatedParents } from "../types/get-parents-response.type";
import { IGetParentsUseCase } from "../use-case-interfaces/get-parents.use-case.interface";


export class GetParentsUseCase implements IGetParentsUseCase {
  constructor(
    private readonly _adminRepository: IAdminRepository,
  ) {}

  async execute(
    query: GetParentsQuery,
  ): Promise<PaginatedParents> {
    return this._adminRepository.getParents(query);
  }
}