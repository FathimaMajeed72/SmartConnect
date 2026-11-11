import { ApplicationError } from "../../../../shared/errors/application.error";
import { AttendanceErrorCode } from "../enums/attendance-error-code.enum";

export class NoActiveStudentsError extends ApplicationError {
  constructor() {
    super(
      "No active students are assigned to this batch.",
      AttendanceErrorCode.NO_ACTIVE_STUDENTS,
    );
  }
}