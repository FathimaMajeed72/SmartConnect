import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class BatchTeacherNotFoundError extends ApplicationError {
  constructor() {
    super(
      "The selected teacher was not found.",
      BatchErrorCode.BATCH_TEACHER_NOT_FOUND,
    );
  }
}