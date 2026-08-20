import { AddParentRequest } from "../dtos/add-parent.request";
import { AddParentResponse } from "../dtos/add-parent.response";

import { InviteUserUseCase } from "../../../auth/application/use-cases/invite-user.use-case";

import { Role } from "../../../auth/domain/enums/role.enum";

export class AddParentUseCase {
  constructor(
    private readonly inviteUserUseCase: InviteUserUseCase,
  ) {}

  async execute(
    request: AddParentRequest,
  ): Promise<AddParentResponse> {
    return this.inviteUserUseCase.execute({
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      phone: request.phone,
      role: Role.PARENT,
    });
  }
}