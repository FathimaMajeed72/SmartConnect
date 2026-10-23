import { IBaseRepository } from "../../../../shared/domain/repositories/base.repository";
import { BatchEntity } from "../entities/batch.entity";
import { BatchStatus } from "../enums/batch-status.enum";

export interface IBatchRepository extends IBaseRepository<BatchEntity> {
  findByClassId(classId: string): Promise<BatchEntity[]>;

  findByNameAndClassId(name: string, classId: string): Promise<BatchEntity | null>;

  findByClassTeacherId(classTeacherId: string): Promise<BatchEntity | null>;

  findAssignedClassTeacherIds(): Promise<string[]>;

  updateBatch(
    id: string,
    data: Pick<BatchEntity, "name" | "classTeacherId" | "capacity">,
  ): Promise<BatchEntity | null>;

  updateStatus(
    id: string,
    status: BatchStatus,
    classTeacherId: string | null,
  ): Promise<BatchEntity | null>;
}
