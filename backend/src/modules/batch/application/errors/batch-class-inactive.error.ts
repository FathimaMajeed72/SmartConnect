import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class BatchClassInactiveError extends ApplicationError {
  constructor() {
    super(
      "Cannot create a batch for an inactive class.",
      BatchErrorCode.BATCH_CLASS_INACTIVE,
    );
  }
}