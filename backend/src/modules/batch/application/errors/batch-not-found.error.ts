import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class BatchNotFoundError extends ApplicationError {
  constructor() {
    super(
      "The batch was not found.",
      BatchErrorCode.BATCH_NOT_FOUND,
    );
  }
}