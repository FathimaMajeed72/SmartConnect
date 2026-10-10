import { ApplicationError } from "../../../../shared/errors/application.error";

import { ClassErrorCode } from "../enums/class-error-code.enum";

export class ClassSubjectAlreadyExistsError extends ApplicationError {
  constructor() {
    super(
      "This subject is already assigned to the class.",
      ClassErrorCode.CLASS_SUBJECT_ALREADY_EXISTS,
    );
  }
}