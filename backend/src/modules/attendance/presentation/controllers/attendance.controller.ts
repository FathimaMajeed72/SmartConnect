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
import { IGetStudentAttendanceHistoryUseCase } from "../../application/use-case-interfaces/get-student-attendance-history.usecase.interface";
import { IGetStudentAttendanceSummaryUseCase } from "../../application/use-case-interfaces/get-student-attendance-summary.use-case.interface";
import { GetSchoolAttendanceRequest } from "../../application/dtos/get-school-attendance.request";
import { IGetSchoolAttendanceUseCase } from "../../application/use-case-interfaces/get-school-attendance.use-case.interface";
import { IGetAdminBatchAttendanceUseCase } from "../../application/use-case-interfaces/get-admin-batch-attendance.use-case.interface";

interface ValidatedAttendanceRequest
  extends AuthenticatedRequest, ValidatedParamsRequest, ValidatedQueryRequest {}

export class AttendanceController {
  constructor(
    private readonly _markAttendanceUseCase: IMarkAttendanceUseCase,
    private readonly _getBatchAttendanceUseCase: IGetBatchAttendanceUseCase,
    private readonly _updateAttendanceUseCase: IUpdateAttendanceUseCase,
    private readonly _getMyBatchUseCase: IGetMyBatchUseCase,
    private readonly _getStudentAttendanceHistoryUseCase: IGetStudentAttendanceHistoryUseCase,
    private readonly _getStudentAttendanceSummaryUseCase: IGetStudentAttendanceSummaryUseCase,
    private readonly _getSchoolAttendanceUseCase: IGetSchoolAttendanceUseCase,
    private readonly _getAdminBatchAttendanceUseCase: IGetAdminBatchAttendanceUseCase,
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

  async getStudentAttendanceHistory(
    req: ValidatedAttendanceRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { studentId } = req.validatedParams as {
        studentId: string;
      };

      const { startDate, endDate, page, limit } = req.validatedQuery as {
        startDate?: string;
        endDate?: string;
        page: number;
        limit: number;
      };

      const result = await this._getStudentAttendanceHistoryUseCase.execute(
        {
          studentId,
          startDate,
          endDate,
          page,
          limit,
        },
        req.user!.userId,
      );

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Student attendance history retrieved successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async getStudentAttendanceSummary(
    req: ValidatedAttendanceRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { studentId } = req.validatedParams as {
        studentId: string;
      };

      const { startDate, endDate } = req.validatedQuery as {
        startDate?: string;
        endDate?: string;
      };

      const result = await this._getStudentAttendanceSummaryUseCase.execute(
        {
          studentId,
          startDate,
          endDate,
        },
        req.user!.userId,
      );

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Student attendance summary retrieved successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }
  // Admin
  async getSchoolAttendance(
    req: ValidatedAttendanceRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const query = req.validatedQuery as GetSchoolAttendanceRequest;

      const result = await this._getSchoolAttendanceUseCase.execute(query);

      sendSuccess(res, HttpStatusCode.OK, "School attendance retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async getAdminBatchAttendance(
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

      const result = await this._getAdminBatchAttendanceUseCase.execute({
        batchId,
        date,
      });

      sendSuccess(res, HttpStatusCode.OK, "Batch attendance retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }

}
