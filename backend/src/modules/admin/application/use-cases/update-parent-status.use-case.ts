import { Role } from "../../../auth/domain/enums/role.enum";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";
import { IUserRepository } from "../../../auth/domain/repositories/user.repository";

import { UpdateParentStatusRequest } from "../dtos/update-parent-status.request";
import { UpdateParentStatusResponse } from "../dtos/update-parent-status.response";

import { InvalidParentStatusTransitionError } from "../errors/invalid-parent-status-transition.error";
import { ParentNotFoundError } from "../errors/parent-not-found.error";

import { IUpdateParentStatusUseCase } from "../use-case-interfaces/update-parent-status.use-case.interface";

export class UpdateParentStatusUseCase
  implements IUpdateParentStatusUseCase
{
  constructor(
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateParentStatusRequest,
  ): Promise<UpdateParentStatusResponse> {
    const user = await this._userRepository.findById(id);

    if (!user || user.role !== Role.PARENT) {
      throw new ParentNotFoundError();
    }

    this._validateStatusTransition(
      user.status,
      request.status,
    );

    const updatedUser =
      await this._userRepository.updateStatus(
        user.id,
        request.status,
      );

    return {
      userId: updatedUser.id,
      status: updatedUser.status,
    };
  }

  private _validateStatusTransition(
    currentStatus: UserStatus,
    newStatus: UserStatus,
  ): void {
    if (currentStatus === newStatus) {
      return;
    }

    const allowedTransitions: Record<
      UserStatus,
      UserStatus[]
    > = {
      [UserStatus.INVITED]: [],

      [UserStatus.ACTIVE]: [
        UserStatus.INACTIVE,
        UserStatus.BLOCKED,
      ],

      [UserStatus.INACTIVE]: [
        UserStatus.ACTIVE,
        UserStatus.BLOCKED,
      ],

      [UserStatus.BLOCKED]: [
        UserStatus.ACTIVE,
      ],
    };

    const allowedStatuses =
      allowedTransitions[currentStatus] ?? [];

    if (!allowedStatuses.includes(newStatus)) {
      throw new InvalidParentStatusTransitionError();
    }
  }
}