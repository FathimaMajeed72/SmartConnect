import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { IErrorStatusMapper } from "../../../../shared/presentation/interfaces/error-status-mapper.interface";
import { AdminErrorCode } from "../../application/enums/admin-error-code.enum";

export class AdminErrorStatusMapper implements IErrorStatusMapper {
  private readonly _errorStatusMap: Record<AdminErrorCode, HttpStatusCode> = {
    [AdminErrorCode.TEACHER_NOT_FOUND]: HttpStatusCode.NOT_FOUND,
    [AdminErrorCode.INVALID_TEACHER_STATUS_TRANSITION]: HttpStatusCode.BAD_REQUEST,
    [AdminErrorCode.TEACHER_INVITATION_NOT_ALLOWED]: HttpStatusCode.BAD_REQUEST,
  };

  getStatusCode(errorCode: string): HttpStatusCode | undefined {
    return this._errorStatusMap[errorCode as AdminErrorCode];
  }
}
