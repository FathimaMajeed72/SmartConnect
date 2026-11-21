import { ApplicationError } from "../../../../shared/errors/application.error";

import { StudentParentErrorCode } from "../enums/student-parent-error-code.enum";

export class StudentNotFoundError extends ApplicationError {
  constructor() {
    super(
        "Student not found.", 
        StudentParentErrorCode.STUDENT_NOT_FOUND
    );
  }
}
