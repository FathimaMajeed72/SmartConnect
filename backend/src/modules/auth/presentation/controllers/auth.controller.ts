import { Request, Response, NextFunction } from "express";

import { InviteUserUseCase } from "../../application/use-cases/invite-user.use-case";
import { ActivateAccountUseCase } from "../../application/use-cases/activate-account.use-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { RefreshTokenUseCase } from "../../application/use-cases/refresh-token.use-case";
import { LogoutUseCase } from "../../application/use-cases/logout.use-case";
import { ForgotPasswordUseCase } from "../../application/use-cases/forgot-password.use-case";
import { VerifyResetOtpUseCase } from "../../application/use-cases/verify-reset-otp.use-case";
import { ResetPasswordUseCase } from "../../application/use-cases/reset-password.use-case";
import { ResendResetOtpUseCase } from "../../application/use-cases/resend-reset-otp.use-case";

export class AuthController {
  constructor(
    private readonly inviteUserUseCase: InviteUserUseCase,
    private readonly activateAccountUseCase: ActivateAccountUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly verifyResetOtpUseCase: VerifyResetOtpUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly resendResetOtpUseCase: ResendResetOtpUseCase,
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
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          message: "Refresh token is missing.",
        });

        return;
      }

      const response = await this.logoutUseCase.execute({
        refreshToken,
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.forgotPasswordUseCase.execute(req.body);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyResetOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.verifyResetOtpUseCase.execute(req.body);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.resetPasswordUseCase.execute(req.body);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.resendResetOtpUseCase.execute(req.body);

      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
