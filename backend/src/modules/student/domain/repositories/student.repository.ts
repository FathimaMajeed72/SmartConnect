import { IBaseRepository } from "../../../../shared/domain/repositories/base.repository";
import { StudentEntity } from "../entities/student.entity";
import { StudentStatus } from "../enums/student-status.enum";

export interface IStudentRepository extends IBaseRepository<StudentEntity> {
  findAll(
    page: number,
    limit: number,
    search?: string,
    status?: StudentStatus,
  ): Promise<{
    students: StudentEntity[];
    total: number;
  }>;

  findByAdmissionNumber(
    admissionNumber: string,
  ): Promise<StudentEntity | null>;

  updateStatus(
    id: string,
    status: StudentStatus,
  ): Promise<StudentEntity | null>;
}