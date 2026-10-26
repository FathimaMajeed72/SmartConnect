import { ApplicationError } from "../../../../shared/errors/application.error";

import { StudentParentErrorCode } from "../enums/student-parent-error-code.enum";

export class InactiveStudentError extends ApplicationError {
  constructor() {
    super(
        "The Student is found inactive.",
        StudentParentErrorCode.INACTIVE_STUDENT
    );
  }
}
