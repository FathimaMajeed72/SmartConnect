import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";

import { IErrorStatusMapper } from "../../../../shared/presentation/interfaces/error-status-mapper.interface";

import { ClassErrorCode } from "../../application/enums/class-error-code.enum";

export class ClassErrorStatusMapper implements IErrorStatusMapper {
  private readonly _errorStatusMap: Record<ClassErrorCode, HttpStatusCode> = {
    [ClassErrorCode.CLASS_NOT_FOUND]: HttpStatusCode.NOT_FOUND,
    [ClassErrorCode.CLASS_CODE_ALREADY_EXISTS]: HttpStatusCode.CONFLICT,
    [ClassErrorCode.CLASS_SUBJECT_ALREADY_EXISTS]: HttpStatusCode.CONFLICT,
    [ClassErrorCode.INACTIVE_CLASS]: HttpStatusCode.CONFLICT,
    [ClassErrorCode.INACTIVE_SUBJECT]: HttpStatusCode.CONFLICT,
    [ClassErrorCode.INACTIVE_TEACHER]: HttpStatusCode.CONFLICT,
  };

  getStatusCode(errorCode: string): HttpStatusCode | undefined {
    return this._errorStatusMap[errorCode as ClassErrorCode];
  }
}
