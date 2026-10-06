import type { Request, Response, NextFunction } from "express";

import { Types } from "mongoose";

import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { ValidatedQueryRequest } from "../../../../shared/presentation/middlewares/validate-query.middleware";

import {
  sendError,
  sendSuccess,
} from "../../../../shared/presentation/helpers/response.helper";

import { ICreateSubjectUseCase } from "../../application/use-case-interfaces/create-subject.use-case.interface";
import { IGetSubjectsUseCase } from "../../application/use-case-interfaces/get-subjects.use-case.interface";
import { IGetSubjectUseCase } from "../../application/use-case-interfaces/get-subject.use-case.interface";
import { IUpdateSubjectUseCase } from "../../application/use-case-interfaces/update-subject.use-case.interface";
import { IUpdateSubjectStatusUseCase } from "../../application/use-case-interfaces/update-subject-status.use-case.interface";

import { SubjectStatus } from "../../domain/enums/subject-status.enum";

export class SubjectController {
  constructor(
    private readonly _createSubjectUseCase: ICreateSubjectUseCase,
    private readonly _getSubjectsUseCase: IGetSubjectsUseCase,
    private readonly _getSubjectUseCase: IGetSubjectUseCase,
    private readonly _updateSubjectUseCase: IUpdateSubjectUseCase,
    private readonly _updateSubjectStatusUseCase: IUpdateSubjectStatusUseCase,
  ) {}

  async createSubject(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result =
        await this._createSubjectUseCase.execute(
          req.body,
        );

      sendSuccess(
        res,
        HttpStatusCode.CREATED,
        "Subject created successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async getSubjects(
    req: ValidatedQueryRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {
        page,
        limit,
        search,
        status,
      } = req.validatedQuery as {
        page: number;
        limit: number;
        search?: string;
        status?: SubjectStatus;
      };

      const result =
        await this._getSubjectsUseCase.execute({
          page,
          limit,
          search,
          status,
        });

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Subjects retrieved successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async getSubject(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        sendError(
          res,
          HttpStatusCode.BAD_REQUEST,
          "Invalid subject id.",
        );
        return;
      }

      if (!Types.ObjectId.isValid(id)) {
        sendError(
          res,
          HttpStatusCode.BAD_REQUEST,
          "Invalid subject id.",
        );
        return;
      }

      const result =
        await this._getSubjectUseCase.execute(id);

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Subject retrieved successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async updateSubject(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        sendError(
          res,
          HttpStatusCode.BAD_REQUEST,
          "Invalid subject id.",
        );
        return;
      }

      if (!Types.ObjectId.isValid(id)) {
        sendError(
          res,
          HttpStatusCode.BAD_REQUEST,
          "Invalid subject id.",
        );
        return;
      }

      const result =
        await this._updateSubjectUseCase.execute(
          id,
          req.body,
        );

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Subject updated successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async updateSubjectStatus(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        sendError(
          res,
          HttpStatusCode.BAD_REQUEST,
          "Invalid subject id.",
        );
        return;
      }

      if (!Types.ObjectId.isValid(id)) {
        sendError(
          res,
          HttpStatusCode.BAD_REQUEST,
          "Invalid subject id.",
        );
        return;
      }

      const result =
        await this._updateSubjectStatusUseCase.execute(
          id,
          req.body,
        );

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Subject status updated successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }
}