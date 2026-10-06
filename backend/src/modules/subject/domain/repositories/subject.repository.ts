import { IBaseRepository } from "../../../../shared/domain/repositories/base.repository";
import { SubjectEntity } from "../entities/subject.entity";
import { SubjectStatus } from "../enums/subject-status.enum";

export interface ISubjectRepository
  extends IBaseRepository<SubjectEntity> {

  findAll(
    page: number,
    limit: number,
    search?: string,
    status?: SubjectStatus,
  ): Promise<{
    subjects: SubjectEntity[];
    total: number;
  }>;

  updateStatus(
    id: string,
    status: SubjectStatus,
  ): Promise<SubjectEntity>;

  findByCode(code: string): Promise<SubjectEntity | null>;
}