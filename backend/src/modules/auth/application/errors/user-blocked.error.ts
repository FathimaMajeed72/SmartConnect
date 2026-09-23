import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class UserBlockedError extends ApplicationError {
  constructor() {
    super(
      "User account is blocked.",
      AuthErrorCode.USER_BLOCKED
    );
  }
}