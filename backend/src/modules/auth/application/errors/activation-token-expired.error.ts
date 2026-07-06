import { ApplicationError } from "./application.error";

export class ActivationTokenExpiredError extends ApplicationError {
  constructor() {
    super("Activation token has expired.");
  }
}
