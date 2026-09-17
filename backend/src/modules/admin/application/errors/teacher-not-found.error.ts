import { ApplicationError } from "../../../../shared/errors/application.error";
import { AdminErrorCode } from "../enums/admin-error-code.enum";

export class TeacherNotFoundError extends ApplicationError {
  constructor() {
    super(
      "Teacher not found.",
      AdminErrorCode.TEACHER_NOT_FOUND,
    );
  }
}