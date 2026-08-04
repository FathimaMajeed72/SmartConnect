import { Request, Response, NextFunction } from "express";

import { GetParentsUseCase } from "../../application/use-cases/get-parents.use-case";

export class AdminController {
  constructor(private readonly getParentsUseCase: GetParentsUseCase) {}

  async getParents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search?.toString();

      const result = await this.getParentsUseCase.execute({
        page,
        limit,
        search,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
