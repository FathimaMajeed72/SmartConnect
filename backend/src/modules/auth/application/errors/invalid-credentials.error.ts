import { ApplicationError } from "./application.error";

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super("Invalid email or password.");
  }
}