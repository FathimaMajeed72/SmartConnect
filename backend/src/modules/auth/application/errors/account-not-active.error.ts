import { ApplicationError } from "./application.error";

export class AccountNotActiveError extends ApplicationError {
  constructor() {
    super("Account is not active.");
  }
}