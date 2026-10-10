import { ApplicationError } from "../../../../shared/errors/application.error";
import { ClassErrorCode } from "../enums/class-error-code.enum";

export class InactiveTeacherError extends ApplicationError {
  constructor() {
    super(
      "Cannot assign an inactive teacher.",
      ClassErrorCode.INACTIVE_TEACHER,
    );
  }
}