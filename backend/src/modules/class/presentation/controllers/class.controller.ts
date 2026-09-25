import type { Request, Response, NextFunction } from "express";

import { Types } from "mongoose";

import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { ValidatedQueryRequest } from "../../../../shared/presentation/middlewares/validate-query.middleware";
import {
  sendError,
  sendSuccess,
} from "../../../../shared/presentation/helpers/response.helper";

import { ICreateClassUseCase } from "../../application/use-case-interfaces/create-class.use-case.interface";
import { IGetClassesUseCase } from "../../application/use-case-interfaces/get-classes.use-case.interface";
import { IGetClassUseCase } from "../../application/use-case-interfaces/get-class.use-case.interface";
import { IUpdateClassUseCase } from "../../application/use-case-interfaces/update-class.use-case.interface";
import { IUpdateClassStatusUseCase } from "../../application/use-case-interfaces/update-class-status.use-case.interface";

import { ClassStatus } from "../../domain/enums/class-status.enum";

export class ClassController {
  constructor(
    private readonly _createClassUseCase: ICreateClassUseCase,
    private readonly _getClassesUseCase: IGetClassesUseCase,
    private readonly _getClassUseCase: IGetClassUseCase,
    private readonly _updateClassUseCase: IUpdateClassUseCase,
    private readonly _updateClassStatusUseCase: IUpdateClassStatusUseCase,
  ) {}

  async createClass(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this._createClassUseCase.execute(
        req.body,
      );

      sendSuccess(
        res,
        HttpStatusCode.CREATED,
        "Class created successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async getClasses(
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
        status?: ClassStatus;
      };

      const result = await this._getClassesUseCase.execute({
        page,
        limit,
        search,
        status,
      });

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Classes retrieved successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async getClass(
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
          "Invalid class id.",
        );
        return;
      }

      if (!Types.ObjectId.isValid(id)) {
        sendError(
          res,
          HttpStatusCode.BAD_REQUEST,
          "Invalid class id.",
        );
        return;
      }

      const result = await this._getClassUseCase.execute(id);

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Class retrieved successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async updateClass(
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
          "Invalid class id.",
        );
        return;
      }

      if (!Types.ObjectId.isValid(id)) {
        sendError(
          res,
          HttpStatusCode.BAD_REQUEST,
          "Invalid class id.",
        );
        return;
      }

      const result = await this._updateClassUseCase.execute(
        id,
        req.body,
      );

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Class updated successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async updateClassStatus(
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
          "Invalid class id.",
        );
        return;
      }

      if (!Types.ObjectId.isValid(id)) {
        sendError(
          res,
          HttpStatusCode.BAD_REQUEST,
          "Invalid class id.",
        );
        return;
      }

      const result =
        await this._updateClassStatusUseCase.execute(
          id,
          req.body,
        );

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Class status updated successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }
} 