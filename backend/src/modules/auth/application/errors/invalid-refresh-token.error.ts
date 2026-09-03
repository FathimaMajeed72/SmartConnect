import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class InvalidRefreshTokenError extends ApplicationError {
  constructor() {
    super(
      "Invalid refresh token.",
      AuthErrorCode.INVALID_REFRESH_TOKEN
    );
  }
}