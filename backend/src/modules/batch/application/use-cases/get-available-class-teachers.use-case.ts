import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";
import { IUserRepository } from "../../../auth/domain/repositories/user.repository";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";

import { IBatchRepository } from "../../domain/repositories/batch.repository";

import { AvailableClassTeacherResponse} from "../dtos/available-class-teacher.response";
import { IGetAvailableClassTeachersUseCase } from "../use-case-interfaces/get-available-class-teachers.use-case.interface";

export class GetAvailableClassTeachersUseCase
  implements IGetAvailableClassTeachersUseCase
{
  constructor(
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _userRepository: IUserRepository,
    private readonly _batchRepository: IBatchRepository,
  ) {}

  async execute(): Promise<AvailableClassTeacherResponse[]> {
    const [teachers, assignedTeacherIds] = await Promise.all([
      this._teacherRepository.findAll(),
      this._batchRepository.findAssignedClassTeacherIds(),
    ]);

    const assignedTeacherIdSet = new Set(assignedTeacherIds);

    const availableTeachers: AvailableClassTeacherResponse[] = [];

    for (const teacher of teachers) {
      if (assignedTeacherIdSet.has(teacher.id)) {
        continue;
      }

      const user = await this._userRepository.findById(teacher.userId);

      if (!user || user.status !== UserStatus.ACTIVE) {
        continue;
      }

      availableTeachers.push({
        id: user.id,
        teacherId: teacher.teacherId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }

    return availableTeachers;
  }
}