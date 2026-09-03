import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class UserNotActiveError extends ApplicationError {
  constructor() {
    super(
      "User account is not active.",
      AuthErrorCode.USER_NOT_ACTIVE
    );
  }
}