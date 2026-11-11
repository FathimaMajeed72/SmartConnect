import { ApplicationError } from "../../../../shared/errors/application.error";
import { AttendanceErrorCode } from "../enums/attendance-error-code.enum";

export class EmptyAttendanceError extends ApplicationError {
  constructor() {
    super(
      "Attendance cannot be empty.",
      AttendanceErrorCode.EMPTY_ATTENDANCE,
    );
  }
}