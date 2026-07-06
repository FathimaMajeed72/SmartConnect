import { Request, Response, NextFunction } from "express";

import { InviteUserUseCase } from "../../application/use-cases/invite-user.use-case";
import { ActivateAccountUseCase } from "../../application/use-cases/activate-account.use-case";

export class AuthController {
  constructor(
    private readonly inviteUserUseCase: InviteUserUseCase,
    private readonly activateAccountUseCase: ActivateAccountUseCase,
  ) {}

  async inviteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.inviteUserUseCase.execute(req.body);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async activateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.activateAccountUseCase.execute(req.body);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
