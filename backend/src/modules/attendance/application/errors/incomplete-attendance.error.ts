import { ApplicationError } from "../../../../shared/errors/application.error";
import { AttendanceErrorCode } from "../enums/attendance-error-code.enum";

export class IncompleteAttendanceError extends ApplicationError {
  constructor() {
    super(
      "Attendance must be submitted for every active student in the batch.",
      AttendanceErrorCode.INCOMPLETE_ATTENDANCE,
    );
  }
}