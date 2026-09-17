import { IAdminRepository } from "../../domain/repositories/admin.repository";

import { TeacherDetails } from "../types/get-teacher-response.type";
import { IGetTeacherUseCase } from "../use-case-interfaces/get-teacher.use-case.interface";

export class GetTeacherUseCase implements IGetTeacherUseCase {
  constructor(
    private readonly _adminRepository: IAdminRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<TeacherDetails | null> {
    return this._adminRepository.getTeacherById(id);
  }
}