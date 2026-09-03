import type { Request, Response, NextFunction } from "express";

import { ValidatedQueryRequest } from "../../../../shared/presentation/middlewares/validate-query.middleware";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { IGetParentsUseCase } from "../../application/use-case-interfaces/get-parents.use-case.interface";
import { IAddParentUseCase } from "../../application/use-case-interfaces/add-parent.use-case.interface";

export class AdminController {
  constructor(
    private readonly _getParentsUseCase: IGetParentsUseCase,
    private readonly _addParentUseCase: IAddParentUseCase,
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

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Parents retrieved successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async addParent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addParentUseCase.execute(req.body);

      res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: "Parent invitation sent successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

}
