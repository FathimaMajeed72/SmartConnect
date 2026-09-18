import { ApplicationError } from "../../../../shared/errors/application.error";
import { AdminErrorCode } from "../enums/admin-error-code.enum";

export class TeacherInvitationNotAllowedError
  extends ApplicationError
{
  constructor() {
    super(
      "Invitation can only be resent for an invited teacher.",
      AdminErrorCode.TEACHER_INVITATION_NOT_ALLOWED,
    );
  }
}