import { IBatchRepository } from "../../domain/repositories/batch.repository";
import { IClassRepository } from "../../../class/domain/repositories/class.repository";
import { IUpdateBatchStatusUseCase } from "../use-case-interfaces/update-batch-status.use-case.interface";
import { UpdateBatchStatusRequest } from "../dtos/update-batch-status.request";
import { UpdateBatchStatusResponse } from "../dtos/update-batch-status.response";
import { BatchNotFoundError } from "../errors/batch-not-found.error";
import { BatchClassNotFoundError } from "../errors/batch-class-not-found.error";
import { BatchClassInactiveError } from "../errors/batch-class-inactive.error";
import { ClassStatus } from "../../../class/domain/enums/class-status.enum";
import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";
import { IUserRepository } from "../../../auth/domain/repositories/user.repository";
import { BatchStatus } from "../../domain/enums/batch-status.enum";
import { BatchTeacherNotFoundError } from "../errors/batch-teacher-not-found.error";
import { BatchTeacherInactiveError } from "../errors/batch-teacher-inactive.error";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";
import { BatchTeacherAlreadyAssignedError } from "../errors/batch-teacher-already-assigned.error";

export class UpdateBatchStatusUseCase implements IUpdateBatchStatusUseCase {
  constructor(
    private readonly _batchRepository: IBatchRepository,
    private readonly _classRepository: IClassRepository,
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(
    classId: string,
    batchId: string,
    request: UpdateBatchStatusRequest,
  ): Promise<UpdateBatchStatusResponse> {


    const classEntity = await this._classRepository.findById(classId);

    if (!classEntity) {
      throw new BatchClassNotFoundError();
    }

    if (classEntity.status !== ClassStatus.ACTIVE) {
      throw new BatchClassInactiveError();
    }

    const batch = await this._batchRepository.findById(batchId);

    if (!batch || batch.classId !== classEntity.id) {
      throw new BatchNotFoundError();
    }

    let classTeacherId: string | null = null;

    if (request.status === BatchStatus.ACTIVE) {
      if (!request.classTeacherId) {
        throw new BatchTeacherNotFoundError();
      }

      const teacher = await this._teacherRepository.findByUserId(request.classTeacherId);

      if (!teacher) {
        throw new BatchTeacherNotFoundError();
      }

      const teacherUser = await this._userRepository.findById(teacher.userId);

      if (!teacherUser) {
        throw new BatchTeacherNotFoundError();
      }

      if (teacherUser.status !== UserStatus.ACTIVE) {
        throw new BatchTeacherInactiveError();
      }

      const existingAssignment = await this._batchRepository.findByClassTeacherId(teacher.id);

      if (existingAssignment && existingAssignment.id !== batch.id) {
        throw new BatchTeacherAlreadyAssignedError();
      }

      classTeacherId = teacher.id;
    }

    const updatedBatch = await this._batchRepository.updateStatus(
      batchId,
      request.status,
      classTeacherId,
    );

    if (!updatedBatch) {
      throw new BatchNotFoundError();
    }

    return {
      batchId: updatedBatch.id,
      status: updatedBatch.status,
    };
  }
}
