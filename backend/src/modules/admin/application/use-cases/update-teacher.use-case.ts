import { UpdateTeacherRequest } from "../dtos/update-teacher.request";
import { UpdateTeacherResponse } from "../dtos/update-teacher.response";

import { IUpdateTeacherUseCase } from "../use-case-interfaces/update-teacher.use-case.interface";

import { IUserRepository } from "../../../auth/domain/repositories/user.repository";
import { ITeacherRepository } from "../../domain/repositories/teacher.repository";

import { Role } from "../../../auth/domain/enums/role.enum";

import { TeacherNotFoundError } from "../errors/teacher-not-found.error";
import { EmailAlreadyExistsError } from "../../../../shared/errors/email-already-exists.error";

export class UpdateTeacherUseCase implements IUpdateTeacherUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _teacherRepository: ITeacherRepository,
  ) {}

  async execute(id: string, request: UpdateTeacherRequest): Promise<UpdateTeacherResponse> {
    const user = await this._userRepository.findById(id);

    if (!user) {
      throw new TeacherNotFoundError();
    }
    if (user.role !== Role.TEACHER) {
      throw new TeacherNotFoundError();
    }

    const teacher = await this._teacherRepository.findByUserId(id);

    if (!teacher) {
      throw new TeacherNotFoundError();
    }
    // Check email only when it is actually changing
    const normalizedEmail = request.email.trim().toLowerCase();

    if (normalizedEmail !== user.email) {
      const existingUser = await this._userRepository.findByEmail(normalizedEmail);

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

    const updatedTeacher = {
      ...teacher,

      qualification: request.qualification.trim(),

      joiningDate: new Date(request.joiningDate),

      updatedAt: new Date(),
    };

    await this._userRepository.update(updatedUser);

    await this._teacherRepository.update(updatedTeacher);

    return {
      userId: user.id,
    };
  }
}
