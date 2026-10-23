import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class BatchTeacherAlreadyAssignedError extends ApplicationError {
  constructor() {
    super(
      "Batch Teacher already exists in another batch.",
      BatchErrorCode.BATCH_TEACHER_ALREADY_ASSIGNED,
    );
  }
}