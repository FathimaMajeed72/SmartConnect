import { ApplicationError } from "../../../../shared/errors/application.error";
import { ClassErrorCode } from "../enums/class-error-code.enum";

export class InactiveClassError extends ApplicationError {
  constructor() {
    super(
      "Cannot assign subjects to an inactive class.",
      ClassErrorCode.INACTIVE_CLASS,
    );
  }
}