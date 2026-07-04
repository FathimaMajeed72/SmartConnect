import { ApplicationError } from "./application.error";

export class AccountAlreadyActivatedError extends ApplicationError {
  constructor() {
    super("Account has already been activated.");
  }
}