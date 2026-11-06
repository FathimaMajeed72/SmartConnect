import { ApplicationError } from "../../../../shared/errors/application.error";
import { StudentErrorCode } from "../enums/student-error-code.enum";

export class InactiveBatchError extends ApplicationError {
  constructor() {
    super(
      "Cannot assign students to an inactive batch.",
      StudentErrorCode.INACTIVE_BATCH,
    );
  }
}