import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class InvalidOtpError extends ApplicationError {
  constructor() {
    super(
      "Invalid OTP.",
      AuthErrorCode.INVALID_OTP
    );
  }
}