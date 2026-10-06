import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";

import { IErrorStatusMapper } from "../../../../shared/presentation/interfaces/error-status-mapper.interface";

import { SubjectErrorCode } from "../../application/enums/subject-error-code.enum"; 

export class SubjectErrorStatusMapper implements IErrorStatusMapper {
  private readonly _errorStatusMap: Record<SubjectErrorCode, HttpStatusCode> = {
    [SubjectErrorCode.SUBJECT_NOT_FOUND]: HttpStatusCode.NOT_FOUND,
    [SubjectErrorCode.SUBJECT_CODE_ALREADY_EXISTS]: HttpStatusCode.CONFLICT,
  };

  getStatusCode(errorCode: string): HttpStatusCode | undefined {
    return this._errorStatusMap[errorCode as SubjectErrorCode];
  }
}
