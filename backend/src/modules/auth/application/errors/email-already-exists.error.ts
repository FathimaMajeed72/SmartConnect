import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class EmailAlreadyExistsError extends ApplicationError {
  constructor() {
    super(
      "A user with this email already exists.",
      AuthErrorCode.EMAIL_ALREADY_EXISTS
    );
  }
}