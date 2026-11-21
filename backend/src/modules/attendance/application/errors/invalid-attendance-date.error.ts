import { ApplicationError } from "../../../../shared/errors/application.error";
import { AttendanceErrorCode } from "../enums/attendance-error-code.enum";

export class InvalidAttendanceDateError extends ApplicationError {
  constructor() {
    super(
      "Invalid attendance date.",
      AttendanceErrorCode.INVALID_ATTENDANCE_DATE,
    );
  }
}