import { UpdateParentRequest } from "../dtos/update-parent.request";
import { UpdateParentResponse } from "../dtos/update-parent.response";

import { IUpdateParentUseCase } from "../use-case-interfaces/update-parent.use-case.interface";

import { IUserRepository } from "../../../auth/domain/repositories/user.repository";

import { Role } from "../../../auth/domain/enums/role.enum";

import { ParentNotFoundError } from "../errors/parent-not-found.error"; 
import { EmailAlreadyExistsError } from "../../../../shared/errors/email-already-exists.error";

export class UpdateParentUseCase implements IUpdateParentUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateParentRequest,
  ): Promise<UpdateParentResponse> {
    const user = await this._userRepository.findById(id);

    if (!user) {
      throw new ParentNotFoundError();
    }

    if (user.role !== Role.PARENT) {
      throw new ParentNotFoundError();
    }

    const normalizedEmail = request.email.trim().toLowerCase();

    // Check email only when it is actually changing
    if (normalizedEmail !== user.email) {
      const existingUser =
        await this._userRepository.findByEmail(normalizedEmail);

      if (existingUser && existingUser.id !== user.id) {
        throw new EmailAlreadyExistsError();
      }
    }

    const updatedUser = {
      ...user,

      firstName: request.firstName.trim(),
      lastName: request.lastName.trim(),
      email: normalizedEmail,
      phone: request.phone?.trim() || null,

      updatedAt: new Date(),
    };

    await this._userRepository.update(updatedUser);

    return {
      userId: user.id,
    };
  }
}