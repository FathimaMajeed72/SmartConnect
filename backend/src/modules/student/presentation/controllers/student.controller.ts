import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { ValidatedQueryRequest } from "../../../../shared/presentation/middlewares/validate-query.middleware";
import {
  sendError,
  sendSuccess,
} from "../../../../shared/presentation/helpers/response.helper";

import { ICreateStudentUseCase } from "../../application/use-case-interfaces/create-student.use-case.interface";
import { IGetStudentsUseCase } from "../../application/use-case-interfaces/get-students.use-case.interface";
import { IGetStudentUseCase } from "../../application/use-case-interfaces/get-student.use-case.interface";
import { IUpdateStudentStatusUseCase } from "../../application/use-case-interfaces/update-student-status.use-case.interface";

import { StudentStatus } from "../../domain/enums/student-status.enum";

export class StudentController {
  constructor(
    private readonly _createStudentUseCase: ICreateStudentUseCase,
    private readonly _getStudentsUseCase: IGetStudentsUseCase,
    private readonly _getStudentByIdUseCase: IGetStudentUseCase,
    private readonly _updateStudentStatusUseCase: IUpdateStudentStatusUseCase,
  ) {}

  async createStudent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this._createStudentUseCase.execute(req.body);

      sendSuccess(
        res,
        HttpStatusCode.CREATED,
        "Student created successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async getStudents(
    req: ValidatedQueryRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { page, limit, search, status } =
        req.validatedQuery as {
          page: number;
          limit: number;
          search?: string;
          status?: StudentStatus;
        };

      const result = await this._getStudentsUseCase.execute({
        page,
        limit,
        search,
        status,
      });

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Students retrieved successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async getStudent(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (typeof id !== "string" || !Types.ObjectId.isValid(id)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid student id.");
        return;
      }

      const result = await this._getStudentByIdUseCase.execute(id);

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Student retrieved successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async updateStudentStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (typeof id !== "string" || !Types.ObjectId.isValid(id)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid student id.");
        return;
      }

      const result = await this._updateStudentStatusUseCase.execute({
        id,
        status: req.body.status,
      });

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Student status updated successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }
}