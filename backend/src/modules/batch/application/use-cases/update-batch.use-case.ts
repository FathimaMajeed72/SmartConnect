import { IBatchRepository } from "../../domain/repositories/batch.repository";
import { IClassRepository } from "../../../class/domain/repositories/class.repository";
import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";

import { IUpdateBatchUseCase } from "../use-case-interfaces/update-batch.use-case.interface";
import { UpdateBatchRequest } from "../dtos/update-batch.request";
import { UpdateBatchResponse } from "../dtos/update-batch.response";

import { BatchNotFoundError } from "../errors/batch-not-found.error";
import { BatchClassNotFoundError } from "../errors/batch-class-not-found.error";
import { BatchClassInactiveError } from "../errors/batch-class-inactive.error";
import { BatchTeacherNotFoundError } from "../errors/batch-teacher-not-found.error";
import { BatchAlreadyExistsError } from "../errors/batch-already-exists.error";
import { BatchNameRequiredError } from "../errors/batch-name-required.error";
import { InvalidBatchCapacityError } from "../errors/invalid-batch-capacity.error";

import { ClassStatus } from "../../../class/domain/enums/class-status.enum";
import { IUserRepository } from "../../../auth/domain/repositories/user.repository";
import { BatchTeacherInactiveError } from "../errors/batch-teacher-inactive.error";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";
import { BatchTeacherAlreadyAssignedError } from "../errors/batch-teacher-already-assigned.error";
import { BatchInactiveError } from "../errors/batch-inactive.error";
import { BatchStatus } from "../../domain/enums/batch-status.enum";

export class UpdateBatchUseCase implements IUpdateBatchUseCase {
  constructor(
    private readonly _batchRepository: IBatchRepository,
    private readonly _classRepository: IClassRepository,
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(
    classId: string,
    batchId: string,
    request: UpdateBatchRequest,
  ): Promise<UpdateBatchResponse> {
    const classEntity = await this._classRepository.findById(classId);

    if (!classEntity) {
      throw new BatchClassNotFoundError();
    }

    if (classEntity.status !== ClassStatus.ACTIVE) {
      throw new BatchClassInactiveError();
    }

    const existingBatch = await this._batchRepository.findById(batchId);

    if (!existingBatch || existingBatch.classId !== classEntity.id) {
      throw new BatchNotFoundError();
    }

    if (existingBatch.status !== BatchStatus.ACTIVE) {
      throw new BatchInactiveError();
    }

    const name = request.name.trim().toUpperCase();

    if (!name) {
      throw new BatchNameRequiredError();
    }

    if (!Number.isInteger(request.capacity) || request.capacity < 1) {
      throw new InvalidBatchCapacityError();
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

    if (existingAssignment && existingAssignment.id !== existingBatch.id) {
      throw new BatchTeacherAlreadyAssignedError();
    }

    const duplicateBatch = await this._batchRepository.findByNameAndClassId(name, classEntity.id);

    if (duplicateBatch && duplicateBatch.id !== existingBatch.id) {
      throw new BatchAlreadyExistsError();
    }

    const updatedBatch = await this._batchRepository.updateBatch(batchId, {
      name,
      classTeacherId: teacher.id,
      capacity: request.capacity,
    });

    if (!updatedBatch) {
      throw new BatchNotFoundError();
    }

    return {
      batchId: updatedBatch.id,
    };
  }
}
