import { ApplicationError } from "../../../../shared/errors/application.error";

import { SubjectErrorCode } from "../enums/subject-error-code.enum";

export class SubjectCodeAlreadyExistsError extends ApplicationError {
  constructor() {
    super(
      "Subject with this code already exists.",
      SubjectErrorCode.SUBJECT_CODE_ALREADY_EXISTS,
    );
  }
}