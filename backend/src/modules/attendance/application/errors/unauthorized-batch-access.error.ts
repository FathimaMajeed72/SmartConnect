import { ApplicationError } from "../../../../shared/errors/application.error";
import { AttendanceErrorCode } from "../enums/attendance-error-code.enum";

export class UnauthorizedBatchAccessError extends ApplicationError {
  constructor() {
    super(
      "You are not authorized to mark attendance for this batch.",
      AttendanceErrorCode.UNAUTHORIZED_BATCH_ACCESS,
    );
  }
}