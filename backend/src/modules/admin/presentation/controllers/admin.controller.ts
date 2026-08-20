import type { Request, Response, NextFunction } from "express";

import { GetParentsUseCase } from "../../application/use-cases/get-parents.use-case";

import { ValidatedQueryRequest } from "../../../../shared/presentation/middlewares/validate-query.middleware";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";
import { AddParentUseCase } from "../../application/use-cases/add-parent.use-case";

export class AdminController {
  constructor(
    private readonly getParentsUseCase: GetParentsUseCase,
    private readonly addParentUseCase: AddParentUseCase,
  ) {}

  async getParents(req: ValidatedQueryRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit, search, status } = req.validatedQuery as {
        page: number;
        limit: number;
        search?: string;
        status?: UserStatus;
      };

      const result = await this.getParentsUseCase.execute({
        page,
        limit,
        search,
        status,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async addParent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.addParentUseCase.execute(req.body);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

}
