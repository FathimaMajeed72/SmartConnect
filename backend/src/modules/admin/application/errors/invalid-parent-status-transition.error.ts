import { ApplicationError } from "../../../../shared/errors/application.error";
import { AdminErrorCode } from "../enums/admin-error-code.enum";

export class InvalidParentStatusTransitionError extends ApplicationError {
  constructor() {
    super(
        "Invalid parent status transition.",
        AdminErrorCode.INVALID_PARENT_STATUS_TRANSITION,
    );
  }
}