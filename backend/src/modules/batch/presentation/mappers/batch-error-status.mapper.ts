import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { IErrorStatusMapper } from "../../../../shared/presentation/interfaces/error-status-mapper.interface";
import { BatchErrorCode } from "../../application/enums/batch-error-code.enum";

export class BatchErrorStatusMapper implements IErrorStatusMapper {
  private readonly _errorStatusMap: Record<BatchErrorCode, HttpStatusCode> = {
    [BatchErrorCode.BATCH_NOT_FOUND]: HttpStatusCode.NOT_FOUND,

    [BatchErrorCode.BATCH_NAME_ALREADY_EXISTS]: HttpStatusCode.CONFLICT,

    [BatchErrorCode.BATCH_CLASS_NOT_FOUND]: HttpStatusCode.NOT_FOUND,

    [BatchErrorCode.BATCH_CLASS_INACTIVE]: HttpStatusCode.CONFLICT,
    
    [BatchErrorCode.BATCH_TEACHER_NOT_FOUND]: HttpStatusCode.NOT_FOUND,

    [BatchErrorCode.BATCH_TEACHER_INACTIVE]: HttpStatusCode.CONFLICT,

    [BatchErrorCode.INVALID_BATCH_CAPACITY]: HttpStatusCode.BAD_REQUEST,

    [BatchErrorCode.BATCH_NAME_REQUIRED]: HttpStatusCode.BAD_REQUEST,

    [BatchErrorCode.BATCH_TEACHER_ALREADY_ASSIGNED]: HttpStatusCode.CONFLICT,

    [BatchErrorCode.INVALID_BATCH_STATUS]: HttpStatusCode.BAD_REQUEST,  
    
    [BatchErrorCode.BATCH_INACTIVE]: HttpStatusCode.BAD_REQUEST,
  };

  getStatusCode(errorCode: string): HttpStatusCode | undefined {
    return this._errorStatusMap[errorCode as BatchErrorCode];
  }
}
