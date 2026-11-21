import { ApplicationError } from "../../../../shared/errors/application.error";
import { StudentParentErrorCode } from "../enums/student-parent-error-code.enum";

export class StudentParentRelationshipNotFoundError extends ApplicationError {
  constructor() {
    super(
      "The parent-student relationship was not found.",
      StudentParentErrorCode.STUDENT_PARENT_RELATIONSHIP_NOT_FOUND,
    );
  }
}