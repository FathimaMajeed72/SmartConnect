import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { IErrorStatusMapper } from "../../../../shared/presentation/interfaces/error-status-mapper.interface";
import { AdminErrorCode } from "../../application/enums/admin-error-code.enum";

export class AdminErrorStatusMapper
  implements IErrorStatusMapper
{
  private readonly _errorStatusMap: Record<
    AdminErrorCode,
    HttpStatusCode
  > = {
    [AdminErrorCode.TEACHER_NOT_FOUND]:
      HttpStatusCode.NOT_FOUND,
  };

  getStatusCode(
    errorCode: string,
  ): HttpStatusCode | undefined {
    return this._errorStatusMap[
      errorCode as AdminErrorCode
    ];
  }
}