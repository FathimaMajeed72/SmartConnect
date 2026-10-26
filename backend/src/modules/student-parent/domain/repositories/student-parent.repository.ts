import { IBaseRepository } from "../../../../shared/domain/repositories/base.repository";
import { StudentParentEntity } from "../entities/student-parent.entity";

export interface IStudentParentRepository extends IBaseRepository<StudentParentEntity> {
  findByStudentAndParent(
    studentId: string,
    parentUserId: string,
  ): Promise<StudentParentEntity | null>;

  findByStudentId(studentId: string): Promise<StudentParentEntity[]>;

  existsActivePrimaryContact(studentId: string, excludeRelationshipId?: string): Promise<boolean>;
}
