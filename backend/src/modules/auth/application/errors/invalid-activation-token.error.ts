import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class InvalidActivationTokenError extends ApplicationError {
  constructor() {
    super(
      "Invalid activation token.",
      AuthErrorCode.INVALID_ACTIVATION_TOKEN
    );
  }
}