import { ApplicationError } from "../../../../shared/errors/application.error";

import { StudentParentErrorCode } from "../enums/student-parent-error-code.enum";

export class ParentNotFoundError extends ApplicationError {
  constructor() {
    super(
        "Parent not found.",
        StudentParentErrorCode.PARENT_NOT_FOUND
    );
  }
}
