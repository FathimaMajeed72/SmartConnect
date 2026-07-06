import { ApplicationError } from "./application.error";

export class UserNotActiveError extends ApplicationError {
  constructor() {
    super("User account is not active.");
  }
}