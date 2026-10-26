import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";

import { IErrorStatusMapper } from "../../../../shared/presentation/interfaces/error-status-mapper.interface";

import { StudentErrorCode } from "../../application/enums/student-error-code.enum";

export class StudentErrorStatusMapper implements IErrorStatusMapper {
  private readonly _errorStatusMap: Record<StudentErrorCode, HttpStatusCode> = {
    [StudentErrorCode.STUDENT_ALREADY_EXISTS]: HttpStatusCode.CONFLICT,
    [StudentErrorCode.STUDENT_NOT_FOUND]: HttpStatusCode.NOT_FOUND,
  };

  getStatusCode(errorCode: string): HttpStatusCode | undefined {
    return this._errorStatusMap[errorCode as StudentErrorCode];
  }
}
