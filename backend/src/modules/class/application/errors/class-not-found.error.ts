import { ApplicationError } from "../../../../shared/errors/application.error";

import { ClassErrorCode } from "../enums/class-error-code.enum";

export class ClassNotFoundError extends ApplicationError {
  constructor() {
    super(
      "Class not found.",
      ClassErrorCode.CLASS_NOT_FOUND,
    );
  }
}