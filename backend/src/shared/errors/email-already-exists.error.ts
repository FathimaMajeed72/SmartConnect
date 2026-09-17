import { ApplicationError } from "./application.error";
import { CommonErrorCode } from "../enums/common-error-code.enum";

export class EmailAlreadyExistsError extends ApplicationError {
  constructor() {
    super(
      "A user with this email already exists.",
      CommonErrorCode.EMAIL_ALREADY_EXISTS,
    );
  }
}