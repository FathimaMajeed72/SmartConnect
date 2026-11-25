import { ApplicationError } from "../../../../shared/errors/application.error";
import { AttendanceErrorCode } from "../enums/attendance-error-code.enum";

export class UnauthorizedParentStudentAccessError extends ApplicationError {
  constructor() {
    super(
      "You are not authorized to access this student's attendance.",
      AttendanceErrorCode.PARENT_STUDENT_ACCESS_DENIED,
    );
  }
}