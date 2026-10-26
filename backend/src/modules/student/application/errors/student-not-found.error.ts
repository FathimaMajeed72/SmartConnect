import { ApplicationError } from "../../../../shared/errors/application.error";
import { StudentErrorCode } from "../enums/student-error-code.enum";

export class StudentNotFoundError extends ApplicationError {
  constructor() {
    super(
        "Student not found.",
        StudentErrorCode.STUDENT_NOT_FOUND
    );
  }
}