import { ApplicationError } from "../../../../shared/errors/application.error";

import { StudentParentErrorCode } from "../enums/student-parent-error-code.enum";

export class PrimaryContactAlreadyExistsError extends ApplicationError {
  constructor() {
    super(
      "The student already has an active primary contact.",
      StudentParentErrorCode.PRIMARY_CONTACT_ALREADY_EXISTS,
    );
  }
}
