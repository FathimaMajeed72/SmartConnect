import { AddTeacherRequest } from "../dtos/add-teacher.request";
import { AddTeacherResponse } from "../dtos/add-teacher.response";

import { Role } from "../../../auth/domain/enums/role.enum";
import { IAddTeacherUseCase } from "../use-case-interfaces/add-teacher.use-case.interface";

import { IInviteUserUseCase } from "../../../auth/application/use-case-interfaces/invite-user.use-case.interface";
import { ITeacherRepository } from "../../domain/repositories/teacher.repository";
import { Teacher } from "../../domain/entities/teacher.entity";

export class AddTeacherUseCase implements IAddTeacherUseCase {
  constructor(
    private readonly _inviteUserUseCase: IInviteUserUseCase,
    private readonly _teacherRepository: ITeacherRepository,
  ) {}

  async execute(
    request: AddTeacherRequest,
  ): Promise<AddTeacherResponse> {
    const userResult =
      await this._inviteUserUseCase.execute({
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone,
        role: Role.TEACHER,
      });

    const teacher: Teacher = {
      id: "",
      userId: userResult.userId,
      teacherId: await this.generateTeacherId(),
      qualification: request.qualification,
      joiningDate: new Date(request.joiningDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this._teacherRepository.create(teacher);

    return {
      message: userResult.message,
      userId: userResult.userId,
    };
  }

  private async generateTeacherId(): Promise<string> {
    const latestTeacherId =
      await this._teacherRepository.findLatestTeacherId();

    if (!latestTeacherId) {
      return "TCH001";
    }

    const number = Number(
      latestTeacherId.replace("TCH", ""),
    );

    const nextNumber = number + 1;

    return `TCH${nextNumber.toString().padStart(3, "0")}`;
  }
}