import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class InvalidBatchStatusError extends ApplicationError {
  constructor() {
    super(
      "Invalid batch status.",
      BatchErrorCode.INVALID_BATCH_STATUS,
    );
  }
}