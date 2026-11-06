import { IStudentRepository } from "../../domain/repositories/student.repository";
import { IBatchRepository } from "../../../batch/domain/repositories/batch.repository";

import { IAssignStudentsToBatchUseCase } from "../use-case-interfaces/assign-students-to-batch.use-case.interface";
import { AssignStudentsToBatchRequest } from "../dtos/assign-students-to-batch.request";

import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";

import { BatchStatus } from "../../../batch/domain/enums/batch-status.enum";
import { InactiveBatchError } from "../errors/inactive-batch.error";
import { StudentClassMismatchError } from "../errors/student-class-mismatch.error";
import { BatchCapacityExceededError } from "../errors/batch-capacity-exceeded.error";

export class AssignStudentsToBatchUseCase
  implements IAssignStudentsToBatchUseCase
{
  constructor(
    private readonly _studentRepository: IStudentRepository,
    private readonly _batchRepository: IBatchRepository,
  ) {}

  async execute(request: AssignStudentsToBatchRequest): Promise<void> {
    const { batchId, studentIds } = request;

    const uniqueStudentIds = [...new Set(studentIds)];

    const batch = await this._batchRepository.findById(batchId);

    if (!batch) {
      throw new EntityNotFoundError("Batch");
    }

    if (batch.status !== BatchStatus.ACTIVE) {
      throw new InactiveBatchError;
    }

    const students = await this._studentRepository.findByIds(uniqueStudentIds);

    if (students.length !== uniqueStudentIds.length) {
      throw new EntityNotFoundError("Student");
    }

    const invalidStudent = students.some(
      (student) => student.classId !== batch.classId,
    );

    if (invalidStudent) {
      throw new StudentClassMismatchError();
    }

    const studentsToAdd = students.filter(
      (student) => student.batchId !== batchId,
    );

    const currentStudentCount =
      await this._studentRepository.countByBatchId(batchId);

    const newStudentCount = currentStudentCount + studentsToAdd.length;

    if (newStudentCount > batch.capacity) {
      throw new BatchCapacityExceededError();
    }

    await this._studentRepository.assignToBatch(uniqueStudentIds, batchId);
  }
}