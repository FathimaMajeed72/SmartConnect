import type { Request, Response, NextFunction } from "express";

import { ValidatedQueryRequest } from "../../../../shared/presentation/middlewares/validate-query.middleware";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { IGetParentsUseCase } from "../../application/use-case-interfaces/get-parents.use-case.interface";
import { IAddParentUseCase } from "../../application/use-case-interfaces/add-parent.use-case.interface";
import { IGetTeachersUseCase } from "../../application/use-case-interfaces/get-teachers.use-case.interface";
import { IAddTeacherUseCase } from "../../application/use-case-interfaces/add-teacher.use-case.interface";
import { sendSuccess } from "../../../../shared/presentation/helpers/response.helper";

export class AdminController {
  constructor(
    private readonly _getParentsUseCase: IGetParentsUseCase,
    private readonly _addParentUseCase: IAddParentUseCase,
    private readonly _getTeachersUseCase: IGetTeachersUseCase,
    private readonly _addTeacherUseCase: IAddTeacherUseCase,
  ) {}

  async getParents(req: ValidatedQueryRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit, search, status } = req.validatedQuery as {
        page: number;
        limit: number;
        search?: string;
        status?: UserStatus;
      };

      const result = await this._getParentsUseCase.execute({
        page,
        limit,
        search,
        status,
      });

      sendSuccess(res, HttpStatusCode.OK, "Parents retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async addParent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addParentUseCase.execute(req.body);

      sendSuccess(res, HttpStatusCode.CREATED, "Parent invitation sent successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async getTeachers(req: ValidatedQueryRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit, search, status } = req.validatedQuery as {
        page: number;
        limit: number;
        search?: string;
        status?: UserStatus;
      };

      const result = await this._getTeachersUseCase.execute({
        page,
        limit,
        search,
        status,
      });

      sendSuccess(res, HttpStatusCode.OK, "Teachers retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async addTeacher(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addTeacherUseCase.execute(req.body);

      sendSuccess(res, HttpStatusCode.CREATED, "Teacher invitation sent successfully.", result);
    } catch (error) {
      next(error);
    }
  }
}
