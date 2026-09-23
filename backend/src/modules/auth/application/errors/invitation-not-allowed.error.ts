import { ApplicationError } from "../../../../shared/errors/application.error";

import { AuthErrorCode } from "../enums/auth-error-code.enum";

export class InvitationNotAllowedError extends ApplicationError {
  constructor() {
    super(
      "Invitation can only be resent to invited users.",
      AuthErrorCode.INVITATION_NOT_ALLOWED,
    );
  }
}