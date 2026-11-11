import { ApplicationError } from "../../../../shared/errors/application.error";
import { AttendanceErrorCode } from "../enums/attendance-error-code.enum";

export class FutureAttendanceDateError extends ApplicationError {
  constructor() {
    super(
      "Attendance cannot be marked for a future date.",
      AttendanceErrorCode.FUTURE_DATE_NOT_ALLOWED,
    );
  }
}