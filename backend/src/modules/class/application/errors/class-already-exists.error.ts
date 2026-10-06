import { ApplicationError } from "../../../../shared/errors/application.error";

import { ClassErrorCode } from "../enums/class-error-code.enum";

export class ClassAlreadyExistsError extends ApplicationError {
  constructor() {
    super(
      "Class name or code already exists.",
      ClassErrorCode.CLASS_CODE_ALREADY_EXISTS,
    );
  }
}