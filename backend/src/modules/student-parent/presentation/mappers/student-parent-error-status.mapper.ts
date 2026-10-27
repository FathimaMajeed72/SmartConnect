import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";

import { IErrorStatusMapper } from "../../../../shared/presentation/interfaces/error-status-mapper.interface";

import { StudentParentErrorCode } from "../../application/enums/student-parent-error-code.enum";

export class StudentParentErrorStatusMapper implements IErrorStatusMapper {
  private readonly _errorStatusMap: Record<StudentParentErrorCode, HttpStatusCode> = {
    [StudentParentErrorCode.STUDENT_NOT_FOUND]: HttpStatusCode.NOT_FOUND,

    [StudentParentErrorCode.PARENT_NOT_FOUND]: HttpStatusCode.NOT_FOUND,

    [StudentParentErrorCode.USER_IS_NOT_PARENT]: HttpStatusCode.BAD_REQUEST,

    [StudentParentErrorCode.STUDENT_PARENT_ALREADY_EXISTS]: HttpStatusCode.CONFLICT,

    [StudentParentErrorCode.PRIMARY_CONTACT_ALREADY_EXISTS]: HttpStatusCode.CONFLICT,

    [StudentParentErrorCode.STUDENT_PARENT_RELATIONSHIP_NOT_FOUND]: HttpStatusCode.NOT_FOUND,

    [StudentParentErrorCode.INACTIVE_STUDENT]: HttpStatusCode.BAD_REQUEST,

    [StudentParentErrorCode.INACTIVE_PARENT]: HttpStatusCode.BAD_REQUEST,

    [StudentParentErrorCode.INACTIVE_STUDENT_PARENT_RELATIONSHIP]: HttpStatusCode.BAD_REQUEST,
  };

  getStatusCode(errorCode: string): HttpStatusCode | undefined {
    return this._errorStatusMap[errorCode as StudentParentErrorCode];
  }
}
