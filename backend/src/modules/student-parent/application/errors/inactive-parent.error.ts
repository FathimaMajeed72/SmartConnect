import { ApplicationError } from "../../../../shared/errors/application.error";

import { StudentParentErrorCode } from "../enums/student-parent-error-code.enum";

export class InactiveParentError extends ApplicationError {
  constructor() {
    super(
        "The Parent is found inactive.",
        StudentParentErrorCode.INACTIVE_PARENT
    );
  }
}
