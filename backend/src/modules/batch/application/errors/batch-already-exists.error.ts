import { ApplicationError } from "../../../../shared/errors/application.error";
import { BatchErrorCode } from "../enums/batch-error-code.enum";

export class BatchAlreadyExistsError extends ApplicationError {
  constructor() {
    super(
      "Batch name already exists in this class.",
      BatchErrorCode.BATCH_NAME_ALREADY_EXISTS,
    );
  }
}