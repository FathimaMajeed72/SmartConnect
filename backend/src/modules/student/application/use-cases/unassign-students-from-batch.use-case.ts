import { IStudentRepository } from "../../domain/repositories/student.repository";
import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";

import { IUnassignStudentsFromBatchUseCase } from "../use-case-interfaces/unassign-students-from-batch.use-case.interface";
import { UnassignStudentsFromBatchRequest } from "../dtos/unassign-students-from-batch.request";
import { UnassignStudentsFromBatchResponse } from "../dtos/unassign-students-from-batch.response";

import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";

export class UnassignStudentsFromBatchUseCase
  implements IUnassignStudentsFromBatchUseCase
{
  constructor(
    private readonly _studentRepository: IStudentRepository,
    private readonly _batchRepository: IBatchRepository,
  ) {}

  async execute(
    request: UnassignStudentsFromBatchRequest,
  ): Promise<UnassignStudentsFromBatchResponse> {
    const { batchId, studentIds } = request;

    const uniqueStudentIds = [...new Set(studentIds)];

    if (uniqueStudentIds.length === 0) {
      return { unassignedCount: 0 };
    }

    const batch = await this._batchRepository.findById(batchId);

    if (!batch) {
      throw new EntityNotFoundError("Batch");
    }

    const students =
      await this._studentRepository.findByIds(uniqueStudentIds);

    if (students.length !== uniqueStudentIds.length) {
      throw new EntityNotFoundError("Student");
    }

    const invalidStudent = students.some(
      (student) => student.batchId !== batchId,
    );

    if (invalidStudent) {
      throw new EntityNotFoundError("Student assignment");
    }

    const unassignedCount =
      await this._studentRepository.unassignFromBatch(
        uniqueStudentIds,
        batchId,
      );

    return { unassignedCount };
  }
}