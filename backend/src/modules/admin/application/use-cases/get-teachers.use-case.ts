import { IAdminRepository } from "../../domain/repositories/admin.repository";

import { GetTeachersQuery } from "../types/get-teachers-query.type";
import { PaginatedTeachers } from "../types/get-teachers-response.type";

import { IGetTeachersUseCase } from "../use-case-interfaces/get-teachers.use-case.interface";

export class GetTeachersUseCase implements IGetTeachersUseCase {
  constructor(
    private readonly _adminRepository: IAdminRepository,
  ) {}

  async execute(
    query: GetTeachersQuery,
  ): Promise<PaginatedTeachers> {
    return this._adminRepository.getTeachers(query);
  }
}