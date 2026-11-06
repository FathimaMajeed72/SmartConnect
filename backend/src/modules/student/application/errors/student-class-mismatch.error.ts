import { ApplicationError } from "../../../../shared/errors/application.error";
import { StudentErrorCode } from "../enums/student-error-code.enum";

export class StudentClassMismatchError extends ApplicationError {
  constructor() {
    super(
      "All selected students must belong to the batch's class.",
      StudentErrorCode.STUDENT_CLASS_MISMATCH,
    );
  }
}