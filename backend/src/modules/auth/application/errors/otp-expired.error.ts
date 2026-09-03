import { ApplicationError } from "../../../../shared/errors/application.error";
import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class OtpExpiredError extends ApplicationError {
  constructor() {
    super(
      "OTP has expired.",
      AuthErrorCode.OTP_EXPIRED
    );
  }
}