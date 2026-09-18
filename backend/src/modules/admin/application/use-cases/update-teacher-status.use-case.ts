import { Role } from "../../../auth/domain/enums/role.enum";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";
import { IUserRepository } from "../../../auth/domain/repositories/user.repository";

import { UpdateTeacherStatusRequest } from "../dtos/update-teacher-status.request";
import { UpdateTeacherStatusResponse } from "../dtos/update-teacher-status.response";
import { InvalidTeacherStatusTransitionError } from "../errors/invalid-teacher-status-transition.error";

import { TeacherNotFoundError } from "../errors/teacher-not-found.error";

import { IUpdateTeacherStatusUseCase } from "../use-case-interfaces/update-teacher-status.use-case.interface";

export class UpdateTeacherStatusUseCase
  implements IUpdateTeacherStatusUseCase
{
  constructor(
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateTeacherStatusRequest,
  ): Promise<UpdateTeacherStatusResponse> {
    const user = await this._userRepository.findById(id);

    if (!user || user.role !== Role.TEACHER) {
      throw new TeacherNotFoundError();
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
      throw new InvalidTeacherStatusTransitionError();
    }
  }

}