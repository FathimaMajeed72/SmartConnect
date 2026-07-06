import { Request, Response, NextFunction } from "express";

import { InviteUserUseCase } from "../../application/use-cases/invite-user.use-case";
import { ActivateAccountUseCase } from "../../application/use-cases/activate-account.use-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { RefreshTokenUseCase } from "../../application/use-cases/refresh-token.use-case";

export class AuthController {
  constructor(
    private readonly inviteUserUseCase: InviteUserUseCase,
    private readonly activateAccountUseCase: ActivateAccountUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.loginUseCase.execute(req.body);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.refreshTokenUseCase.execute(req.body);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
