import { ApplicationError } from "../../../../shared/errors/application.error";
import { AdminErrorCode } from "../enums/admin-error-code.enum";

export class ParentNotFoundError extends ApplicationError {
  constructor() {
    super(
      "Parent not found.",
      AdminErrorCode.PARENT_NOT_FOUND,
    );
  }
}