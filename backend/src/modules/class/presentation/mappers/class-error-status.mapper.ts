import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";

import { IErrorStatusMapper } from "../../../../shared/presentation/interfaces/error-status-mapper.interface";

import { ClassErrorCode } from "../../application/enums/class-error-code.enum";

export class ClassErrorStatusMapper implements IErrorStatusMapper {
  private readonly _errorStatusMap: Record<
    ClassErrorCode,
    HttpStatusCode
  > = {
    [ClassErrorCode.CLASS_NOT_FOUND]: HttpStatusCode.NOT_FOUND,
  };

  getStatusCode(
    errorCode: string,
  ): HttpStatusCode | undefined {
    return this._errorStatusMap[errorCode as ClassErrorCode];
  }
}