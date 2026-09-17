import { HttpStatusCode } from "../../enums/http-status-code.enum";
import { CommonErrorCode } from "../../enums/common-error-code.enum";
import { IErrorStatusMapper } from "../interfaces/error-status-mapper.interface";

export class CommonErrorStatusMapper
  implements IErrorStatusMapper
{
  private readonly _errorStatusMap: Record<
    CommonErrorCode,
    HttpStatusCode
  > = {
    [CommonErrorCode.EMAIL_ALREADY_EXISTS]:
      HttpStatusCode.CONFLICT,
  };

  getStatusCode(
    errorCode: string,
  ): HttpStatusCode | undefined {
    return this._errorStatusMap[
      errorCode as CommonErrorCode
    ];
  }
}