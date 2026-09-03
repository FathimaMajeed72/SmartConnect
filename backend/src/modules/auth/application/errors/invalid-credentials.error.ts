import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super(
      "Invalid email or password.", 
      AuthErrorCode.INVALID_CREDENTIALS
    );
  }
}
