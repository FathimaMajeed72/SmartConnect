import { ICreateBatchUseCase } from "../use-case-interfaces/create-batch.use-case.interface";

import { CreateBatchRequest } from "../dtos/create-batch.request";
import { CreateBatchResponse } from "../dtos/create-batch.response";

import { IBatchRepository } from "../../domain/repositories/batch.repository";
import { IClassRepository } from "../../../class/domain/repositories/class.repository";
import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";

import { BatchEntity } from "../../domain/entities/batch.entity";
import { BatchStatus } from "../../domain/enums/batch-status.enum";
import { ClassStatus } from "../../../class/domain/enums/class-status.enum";

import { BatchNameRequiredError } from "../errors/batch-name-required.error";
import { InvalidBatchCapacityError } from "../errors/invalid-batch-capacity.error";
import { BatchClassNotFoundError } from "../errors/batch-class-not-found.error";
import { BatchClassInactiveError } from "../errors/batch-class-inactive.error";
import { BatchTeacherNotFoundError } from "../errors/batch-teacher-not-found.error";
import { BatchAlreadyExistsError } from "../errors/batch-already-exists.error";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";
import { IUserRepository } from "../../../auth/domain/repositories/user.repository";
import { BatchTeacherInactiveError } from "../errors/batch-teacher-inactive.error";

export class CreateBatchUseCase implements ICreateBatchUseCase {
  constructor(
    private readonly _batchRepository: IBatchRepository,
    private readonly _classRepository: IClassRepository,
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _userRepository: IUserRepository,
  ) {}

  async execute(classId: string, request: CreateBatchRequest): Promise<CreateBatchResponse> {
    const normalizedName = request.name.trim().toUpperCase();

    if (!normalizedName) {
      throw new BatchNameRequiredError();
    }

    if (!Number.isInteger(request.capacity) || request.capacity < 1) {
      throw new InvalidBatchCapacityError();
    }

    const classEntity = await this._classRepository.findById(classId);

    if (!classEntity) {
      throw new BatchClassNotFoundError();
    }

    if (classEntity.status !== ClassStatus.ACTIVE) {
      throw new BatchClassInactiveError();
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

    const existingBatch = await this._batchRepository.findByNameAndClassId(
      normalizedName,
      classEntity.id,
    );

    if (existingBatch) {
      throw new BatchAlreadyExistsError();
    }

    const batch: BatchEntity = {
      id: "",
      name: normalizedName,
      classId: classEntity.id,
      classTeacherId: teacher.id,
      capacity: request.capacity,
      status: BatchStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdBatch = await this._batchRepository.create(batch);

    return {
      batchId: createdBatch.id,
    };
  }
}
