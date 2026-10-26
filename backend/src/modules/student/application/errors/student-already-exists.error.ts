import { ApplicationError } from "../../../../shared/errors/application.error";

import { StudentErrorCode } from "../enums/student-error-code.enum";

export class StudentAlreadyExistsError extends ApplicationError {
  constructor() {
    super(
      "Student admission number already exists.",
      StudentErrorCode.STUDENT_ALREADY_EXISTS,
    );
  }
}