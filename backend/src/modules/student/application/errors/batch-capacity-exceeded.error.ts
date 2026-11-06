import { ApplicationError } from "../../../../shared/errors/application.error";
import { StudentErrorCode } from "../enums/student-error-code.enum";

export class BatchCapacityExceededError extends ApplicationError {
  constructor() {
    super(
      "The selected batch does not have enough capacity.",
      StudentErrorCode.BATCH_CAPACITY_EXCEEDED,
    );
  }
}