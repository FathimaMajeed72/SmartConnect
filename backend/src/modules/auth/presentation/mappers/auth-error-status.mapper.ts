import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { IErrorStatusMapper } from "../../../../shared/presentation/interfaces/error-status-mapper.interface";
import { AuthErrorCode } from "../../application/enums/auth-error-code.enum";



export class AuthErrorStatusMapper implements IErrorStatusMapper {
  private readonly _errorStatusMap: Record<AuthErrorCode, HttpStatusCode> = {
    [AuthErrorCode.ACCOUNT_ALREADY_ACTIVATED]:
      HttpStatusCode.BAD_REQUEST,

    [AuthErrorCode.ACTIVATION_TOKEN_EXPIRED]:
      HttpStatusCode.BAD_REQUEST,

    [AuthErrorCode.INVALID_ACTIVATION_TOKEN]:
      HttpStatusCode.BAD_REQUEST,

    [AuthErrorCode.INVALID_CREDENTIALS]:
      HttpStatusCode.UNAUTHORIZED,

    [AuthErrorCode.INVALID_OTP]:
      HttpStatusCode.BAD_REQUEST,

    [AuthErrorCode.INVALID_REFRESH_TOKEN]:
      HttpStatusCode.UNAUTHORIZED,

    [AuthErrorCode.OTP_EXPIRED]:
      HttpStatusCode.BAD_REQUEST,

    [AuthErrorCode.REFRESH_TOKEN_EXPIRED]:
      HttpStatusCode.UNAUTHORIZED,

    [AuthErrorCode.USER_NOT_ACTIVE]:
      HttpStatusCode.FORBIDDEN,

    [AuthErrorCode.USER_NOT_FOUND]:
      HttpStatusCode.NOT_FOUND,
  };

  getStatusCode(errorCode: string): HttpStatusCode | undefined {
    return this._errorStatusMap[errorCode as AuthErrorCode];
  }
}