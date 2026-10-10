import { ApplicationError } from "../../../../shared/errors/application.error";
import { ClassErrorCode } from "../enums/class-error-code.enum";

export class InactiveSubjectError extends ApplicationError {
  constructor() {
    super(
      "Cannot assign an inactive subject.",
      ClassErrorCode.INACTIVE_SUBJECT,
    );
  }
}