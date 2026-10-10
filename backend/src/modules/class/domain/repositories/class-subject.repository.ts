import { IBaseRepository } from "../../../../shared/domain/repositories/base.repository";
import { ClassSubjectEntity } from "../entities/class-subject.entity";
import { ClassSubjectStatus } from "../enums/class-subject-status.enum";
import { ClassSubjectDetails } from "../types/class-subject-details.type";

export interface IClassSubjectRepository
  extends IBaseRepository<ClassSubjectEntity> {

  findByClassAndSubject(
    classId: string,
    subjectId: string,
  ): Promise<ClassSubjectEntity | null>;

  findDetailsByClassId(
    classId: string,
  ): Promise<ClassSubjectDetails[]>;

  updateStatus(
    id: string,
    status: ClassSubjectStatus,
  ): Promise<ClassSubjectEntity>;
}