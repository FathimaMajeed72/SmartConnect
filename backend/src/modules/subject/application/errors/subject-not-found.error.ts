import { ApplicationError } from "../../../../shared/errors/application.error";

import { SubjectErrorCode } from "../enums/subject-error-code.enum";

export class SubjectNotFoundError extends ApplicationError {
  constructor() {
    super(
      "Subject not found.",
      SubjectErrorCode.SUBJECT_NOT_FOUND,
    );
  }
}