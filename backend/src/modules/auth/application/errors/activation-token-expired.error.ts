import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class ActivationTokenExpiredError extends ApplicationError {
  constructor() {
    super(
      "Activation token has expired.",
      AuthErrorCode.ACTIVATION_TOKEN_EXPIRED
    );
  }
}
