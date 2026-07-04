import { ApplicationError } from "./application.error";

export class EmailAlreadyExistsError extends ApplicationError {
  constructor() {
    super("A user with this email already exists.");
  }
}