import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class RefreshTokenExpiredError extends ApplicationError {
  constructor() {
    super(
      "Token has expired.",
      AuthErrorCode.REFRESH_TOKEN_EXPIRED
    );
  }
}