import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class BatchNameRequiredError extends ApplicationError {
  constructor() {
    super(
      "Batch name is required.",
      BatchErrorCode.BATCH_NAME_REQUIRED,
    );
  }
}