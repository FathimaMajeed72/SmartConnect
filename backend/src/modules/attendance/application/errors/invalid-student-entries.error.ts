import { ApplicationError } from "../../../../shared/errors/application.error";
import { AttendanceErrorCode } from "../enums/attendance-error-code.enum";

export class InvalidStudentEntriesError extends ApplicationError {
  constructor() {
    super(
      "Attendance contains students who are not active members of this batch.",
      AttendanceErrorCode.INVALID_STUDENT_ENTRIES,
    );
  }
}