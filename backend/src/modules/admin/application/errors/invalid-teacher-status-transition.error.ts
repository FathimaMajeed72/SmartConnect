import { ApplicationError } from "../../../../shared/errors/application.error";
import { AdminErrorCode } from "../enums/admin-error-code.enum";

export class InvalidTeacherStatusTransitionError extends ApplicationError {
  constructor() {
    super(
      "Invalid teacher status transition.",
      AdminErrorCode.INVALID_TEACHER_STATUS_TRANSITION,
    );
  }
}