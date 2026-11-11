import { ApplicationError } from "../../../../shared/errors/application.error";
import { AttendanceErrorCode } from "../enums/attendance-error-code.enum";

export class DuplicateStudentEntriesError extends ApplicationError {
  constructor() {
    super(
      "Duplicate student entries are not allowed.",
      AttendanceErrorCode.DUPLICATE_STUDENT_ENTRIES,
    );
  }
}