import { ApplicationError } from "./application.error";

export class TokenExpiredError extends ApplicationError {
  constructor() {
    super("Token has expired.");
  }
}