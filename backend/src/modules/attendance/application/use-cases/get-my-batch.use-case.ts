import { IGetMyBatchUseCase } from "../use-case-interfaces/get-my-batch.use-case.interface";

import { GetMyBatchResponse } from "../dtos/get-my-batch.response";

import { ITeacherRepository } from "../../../admin/domain/repositories/teacher.repository";
import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";

import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";
import { IClassRepository } from "../../../class/domain/repositories/class.repository";

export class GetMyBatchUseCase implements IGetMyBatchUseCase {
  constructor(
    private readonly _teacherRepository: ITeacherRepository,
    private readonly _batchRepository: IBatchRepository,
    private readonly _classRepository: IClassRepository,
  ) {}

  async execute(userId: string): Promise<GetMyBatchResponse> {
    const teacher = await this._teacherRepository.findByUserId(userId);

    if (!teacher) {
      throw new EntityNotFoundError("Teacher");
    }

    const batch = await this._batchRepository.findByClassTeacherId(teacher.id);

    if (!batch) {
      throw new EntityNotFoundError("Assigned batch");
    }

    const classEntity = await this._classRepository.findById(batch.classId);

    if (!classEntity) {
      throw new EntityNotFoundError("Class");
    }

    return {
      batchId: batch.id,
      batchName: batch.name,
      classId: batch.classId,
      className: classEntity.name,
      classTeacherId: batch.classTeacherId!,
      status: batch.status,
    };
  }
}
