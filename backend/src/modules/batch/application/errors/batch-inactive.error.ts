import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class BatchInactiveError extends ApplicationError {
  constructor() {
    super(
      "Cannot edit an inactive batch.",
      BatchErrorCode.BATCH_INACTIVE,
    );
  }
}