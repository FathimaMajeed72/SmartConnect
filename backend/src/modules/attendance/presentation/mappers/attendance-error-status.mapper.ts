import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";

import { IErrorStatusMapper } from "../../../../shared/presentation/interfaces/error-status-mapper.interface";

import { AttendanceErrorCode } from "../../application/enums/attendance-error-code.enum";

export class AttendanceErrorStatusMapper implements IErrorStatusMapper {
  private readonly _errorStatusMap: Record<
    AttendanceErrorCode,
    HttpStatusCode
  > = {
    [AttendanceErrorCode.TEACHER_NOT_FOUND]: HttpStatusCode.NOT_FOUND,

    [AttendanceErrorCode.BATCH_NOT_FOUND]: HttpStatusCode.NOT_FOUND,

    [AttendanceErrorCode.BATCH_INACTIVE]: HttpStatusCode.CONFLICT,

    [AttendanceErrorCode.UNAUTHORIZED_BATCH_ACCESS]: HttpStatusCode.FORBIDDEN,

    [AttendanceErrorCode.FUTURE_DATE_NOT_ALLOWED]: HttpStatusCode.BAD_REQUEST,

    [AttendanceErrorCode.NO_ACTIVE_STUDENTS]: HttpStatusCode.CONFLICT,

    [AttendanceErrorCode.EMPTY_ATTENDANCE]: HttpStatusCode.BAD_REQUEST,

    [AttendanceErrorCode.DUPLICATE_STUDENT_ENTRIES]: HttpStatusCode.BAD_REQUEST,

    [AttendanceErrorCode.INVALID_STUDENT_ENTRIES]: HttpStatusCode.BAD_REQUEST,

    [AttendanceErrorCode.INCOMPLETE_ATTENDANCE]: HttpStatusCode.BAD_REQUEST,

    [AttendanceErrorCode.ATTENDANCE_ALREADY_MARKED]: HttpStatusCode.CONFLICT,

    [AttendanceErrorCode.INVALID_ATTENDANCE_DATE]: HttpStatusCode.BAD_REQUEST,

    [AttendanceErrorCode.PARENT_STUDENT_ACCESS_DENIED]: HttpStatusCode.FORBIDDEN,
  };

  getStatusCode(errorCode: string): HttpStatusCode | undefined {
    return this._errorStatusMap[errorCode as AttendanceErrorCode];
  }
}