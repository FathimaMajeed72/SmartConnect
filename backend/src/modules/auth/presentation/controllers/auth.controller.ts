import { Request, Response, NextFunction } from "express";

import { InviteUserUseCase } from "../../application/use-cases/invite-user.use-case";
import { ActivateAccountUseCase } from "../../application/use-cases/activate-account.use-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { RefreshTokenUseCase } from "../../application/use-cases/refresh-token.use-case";
import { LogoutUseCase } from "../../application/use-cases/logout.use-case";

export class AuthController {
  constructor(
    private readonly inviteUserUseCase: InviteUserUseCase,
    private readonly activateAccountUseCase: ActivateAccountUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
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

      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        data: {
          accessToken: response.accessToken,
          user: response.user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("Cookies:", req.cookies);

      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          message: "Refresh token is missing.",
        });
        return;
      }

      console.log("Refresh Token:", refreshToken);

      const response = await this.refreshTokenUseCase.execute({
        refreshToken,
      });

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.logoutUseCase.execute(req.body);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
