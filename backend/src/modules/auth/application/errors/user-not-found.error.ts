import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class UserNotFoundError extends ApplicationError {
  constructor() {
    super(
      "User not found.",
      AuthErrorCode.USER_NOT_FOUND
    );
  }
}