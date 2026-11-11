import { ApplicationError } from "../../../../shared/errors/application.error";
import { AttendanceErrorCode } from "../enums/attendance-error-code.enum";

export class AttendanceInactiveBatchError extends ApplicationError {
  constructor() {
    super(
      "Cannot mark attendance for an inactive batch.",
      AttendanceErrorCode.BATCH_INACTIVE,
    );
  }
}