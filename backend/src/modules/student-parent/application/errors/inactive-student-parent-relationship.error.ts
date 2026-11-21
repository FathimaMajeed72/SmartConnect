import { ApplicationError } from "../../../../shared/errors/application.error";
import { StudentParentErrorCode } from "../enums/student-parent-error-code.enum";

export class InactiveStudentParentRelationshipError extends ApplicationError {
  constructor() {
    super(
      "An inactive parent-student relationship cannot be updated.",
      StudentParentErrorCode.INACTIVE_STUDENT_PARENT_RELATIONSHIP,
    );
  }
}