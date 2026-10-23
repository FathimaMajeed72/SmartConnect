import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class InvalidBatchCapacityError extends ApplicationError {
  constructor() {
    super(
      "Batch capacity must be a positive integer.",
      BatchErrorCode.INVALID_BATCH_CAPACITY,
    );
  }
}