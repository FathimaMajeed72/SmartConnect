import type { Response, NextFunction } from "express";

import { AuthenticatedRequest } from "../../../../shared/presentation/middlewares/authenticate.middleware";

import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";

import { sendSuccess } from "../../../../shared/presentation/helpers/response.helper";

import { IMarkAttendanceUseCase } from "../../application/use-case-interfaces/mark-attendance.use-case.interface";
import { IGetBatchAttendanceUseCase } from "../../application/use-case-interfaces/get-batch-attendance.use-case.interface";
import { ValidatedParamsRequest } from "../../../../shared/presentation/middlewares/validate-params.middleware";
import { ValidatedQueryRequest } from "../../../../shared/presentation/middlewares/validate-query.middleware";
import { IUpdateAttendanceUseCase } from "../../application/use-case-interfaces/update-attendance.use-case.interface";
import { IGetMyBatchUseCase } from "../../application/use-case-interfaces/get-my-batch.use-case.interface";

interface ValidatedAttendanceRequest
  extends AuthenticatedRequest, ValidatedParamsRequest, ValidatedQueryRequest {}

export class AttendanceController {
  constructor(
    private readonly _markAttendanceUseCase: IMarkAttendanceUseCase,
    private readonly _getBatchAttendanceUseCase: IGetBatchAttendanceUseCase,
    private readonly _updateAttendanceUseCase: IUpdateAttendanceUseCase,
    private readonly _getMyBatchUseCase: IGetMyBatchUseCase,
  ) {}

  async markAttendance(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user!.userId;

      const result = await this._markAttendanceUseCase.execute(req.body, userId);

      sendSuccess(res, HttpStatusCode.CREATED, "Attendance marked successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async getBatchAttendance(
    req: ValidatedAttendanceRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { batchId } = req.validatedParams as {
        batchId: string;
      };

      const { date } = req.validatedQuery as {
        date: string;
      };

      const result = await this._getBatchAttendanceUseCase.execute(
        {
          batchId,
          date: date as string,
        },
        req.user!.userId,
      );

      sendSuccess(res, HttpStatusCode.OK, "Batch attendance retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async updateAttendance(
    req: ValidatedAttendanceRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { batchId } = req.validatedParams as {
        batchId: string;
      };

      const { studentId, date, status, remarks } = req.body;

      const result = await this._updateAttendanceUseCase.execute(
        {
          batchId,
          studentId,
          date,
          status,
          remarks,
        },
        req.user!.userId,
      );

      sendSuccess(res, HttpStatusCode.OK, "Attendance updated successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async getMyBatch(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._getMyBatchUseCase.execute(req.user!.userId);

      sendSuccess(res, HttpStatusCode.OK, "Assigned batch retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }
}
