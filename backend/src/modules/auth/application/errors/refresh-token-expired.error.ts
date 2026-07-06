import { ApplicationError } from "./application.error";

export class RefreshTokenExpiredError extends ApplicationError {
  constructor() {
    super("Token has expired.");
  }
}