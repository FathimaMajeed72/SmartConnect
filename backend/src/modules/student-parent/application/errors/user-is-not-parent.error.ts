import { ApplicationError } from "../../../../shared/errors/application.error";

import { StudentParentErrorCode } from "../enums/student-parent-error-code.enum";

export class UserIsNotParentError extends ApplicationError {
  constructor() {
    super(
        "The selected user is not a parent.", 
        StudentParentErrorCode.USER_IS_NOT_PARENT
    );
  }
}
