import { AddParentRequest } from "../dtos/add-parent.request";
import { AddParentResponse } from "../dtos/add-parent.response";


import { Role } from "../../../auth/domain/enums/role.enum";
import { IAddParentUseCase } from "../use-case-interfaces/add-parent.use-case.interface";
import { IInviteUserUseCase } from "../../../auth/application/use-case-interfaces/invite-user.use-case.interface";

export class AddParentUseCase implements IAddParentUseCase {
  constructor(
    private readonly _inviteUserUseCase: IInviteUserUseCase,
  ) {}

  async execute(
    request: AddParentRequest,
  ): Promise<AddParentResponse> {
    return this._inviteUserUseCase.execute({
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      phone: request.phone,
      role: Role.PARENT,
    });
  }
}