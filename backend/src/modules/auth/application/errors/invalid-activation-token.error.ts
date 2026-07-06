import { ApplicationError } from "./application.error";

export class InvalidActivationTokenError extends ApplicationError {
  constructor() {
    super("Invalid activation token.");
  }
}