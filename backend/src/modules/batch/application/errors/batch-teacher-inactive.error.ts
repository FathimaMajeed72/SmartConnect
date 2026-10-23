import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class BatchTeacherInactiveError extends ApplicationError {
  constructor() {
    super(
      "Cannot create a batch for an inactive class.",
      BatchErrorCode.BATCH_TEACHER_INACTIVE,
    );
  }
}