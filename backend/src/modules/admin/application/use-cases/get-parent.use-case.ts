import { IAdminRepository } from "../../domain/repositories/admin.repository";
import { ParentDetails } from "../types/get-parent-response.type";
import { IGetParentUseCase } from "../use-case-interfaces/get-parent.use-case.interface"; 

export class GetParentUseCase
  implements IGetParentUseCase
{
  constructor(
    private readonly _adminRepository: IAdminRepository,
  ) {}

  async execute(parentId: string): Promise<ParentDetails | null> {
    return this._adminRepository.getParentById(parentId);
  }
}