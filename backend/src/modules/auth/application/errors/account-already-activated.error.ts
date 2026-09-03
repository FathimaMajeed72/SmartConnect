import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class AccountAlreadyActivatedError extends ApplicationError {
  constructor() {
    super(
      "Account has already been activated.",
      AuthErrorCode.ACCOUNT_ALREADY_ACTIVATED
    );
  }
}