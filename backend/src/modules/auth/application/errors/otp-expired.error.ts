import { ApplicationError } from "./application.error";

export class OtpExpiredError extends ApplicationError {
  constructor() {
    super("OTP has expired.");
  }
}