import { StudentParentEntity } from "../../domain/entities/student-parent.entity";
import { AssignParentToStudentResponse } from "../dtos/assign-parent-to-student.response";

export class StudentParentDtoMapper {
  static toAssignResponse(entity: StudentParentEntity): AssignParentToStudentResponse {
    return {
      id: entity.id,
      studentId: entity.studentId,
      parentUserId: entity.parentUserId,
      relationship: entity.relationship,
      isPrimaryContact: entity.isPrimaryContact,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
