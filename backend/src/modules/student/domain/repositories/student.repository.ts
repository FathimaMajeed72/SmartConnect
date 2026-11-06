import { IBaseRepository } from "../../../../shared/domain/repositories/base.repository";
import { StudentEntity } from "../entities/student.entity";
import { StudentStatus } from "../enums/student-status.enum";

export interface IStudentRepository extends IBaseRepository<StudentEntity> {
  findAll(
    page: number,
    limit: number,
    search?: string,
    status?: StudentStatus,
    classId?: string
  ): Promise<{
    students: StudentEntity[];
    total: number;
  }>;

  findByAdmissionNumber(admissionNumber: string): Promise<StudentEntity | null>;

  updateStatus(id: string, status: StudentStatus): Promise<StudentEntity | null>;

  findByIds(ids: string[]): Promise<StudentEntity[]>;

  findByBatchId(batchId: string): Promise<StudentEntity[]>;

  findAvailableByClassId(classId: string): Promise<StudentEntity[]>;

  assignToBatch(studentIds: string[], batchId: string): Promise<number>;

  unassignFromBatch(studentIds: string[], batchId: string): Promise<number>;

  countByBatchId(batchId: string): Promise<number>;
}