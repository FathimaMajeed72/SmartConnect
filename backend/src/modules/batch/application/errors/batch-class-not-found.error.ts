import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class BatchClassNotFoundError extends ApplicationError {
  constructor() {
    super(
      "The selected class was not found.",
      BatchErrorCode.BATCH_CLASS_NOT_FOUND,
    );
  }
}