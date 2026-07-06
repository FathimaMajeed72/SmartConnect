import { ApplicationError } from "./application.error";

export class InvalidRefreshTokenError extends ApplicationError {
  constructor() {
    super("Invalid refresh token.");
  }
}