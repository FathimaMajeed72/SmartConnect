import { ApplicationError } from "./application.error";

export class InvalidOtpError extends ApplicationError {
  constructor() {
    super("Invalid OTP.");
  }
}