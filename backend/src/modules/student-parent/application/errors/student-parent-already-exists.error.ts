import { ApplicationError } from "../../../../shared/errors/application.error";

import { StudentParentErrorCode } from "../enums/student-parent-error-code.enum";

export class StudentParentAlreadyExistsError extends ApplicationError {
  constructor() {
    super(
      "This parent is already associated with the student.",
      StudentParentErrorCode.STUDENT_PARENT_ALREADY_EXISTS,
    );
  }
}
