import { ApplicationError } from "../../../../shared/errors/application.error";
import { AttendanceErrorCode } from "../enums/attendance-error-code.enum";

export class AttendanceAlreadyMarkedError extends ApplicationError {
  constructor() {
    super(
      "Attendance has already been marked for this batch and date.",
      AttendanceErrorCode.ATTENDANCE_ALREADY_MARKED,
    );
  }
}