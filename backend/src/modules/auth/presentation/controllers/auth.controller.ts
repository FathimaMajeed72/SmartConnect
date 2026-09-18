import { Request, Response, NextFunction } from "express";

import { IInviteUserUseCase } from "../../application/use-case-interfaces/invite-user.use-case.interface";
import { IActivateAccountUseCase } from "../../application/use-case-interfaces/activate-account.use-case.interface";
import { ILoginUseCase } from "../../application/use-case-interfaces/login.use-case.interface";
import { IRefreshTokenUseCase } from "../../application/use-case-interfaces/refresh-token.use-case.interface";
import { ILogoutUseCase } from "../../application/use-case-interfaces/logout.use-case.interface";
import { IForgotPasswordUseCase } from "../../application/use-case-interfaces/forgot-password.use-case.interface";
import { IVerifyResetOtpUseCase } from "../../application/use-case-interfaces/verify-reset-otp.use-case.interface";
import { IResetPasswordUseCase } from "../../application/use-case-interfaces/reset-password.use-case.interface";
import { IResendResetOtpUseCase } from "../../application/use-case-interfaces/resend-reset-otp.use-case.interface";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { sendSuccess, sendError } from "../../../../shared/presentation/helpers/response.helper";
import { env } from "../../../../config/env";

export class AuthController {
  constructor(
    private readonly _inviteUserUseCase: IInviteUserUseCase,
    private readonly _activateAccountUseCase: IActivateAccountUseCase,
    private readonly _loginUseCase: ILoginUseCase,
    private readonly _refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly _logoutUseCase: ILogoutUseCase,
    private readonly _forgotPasswordUseCase: IForgotPasswordUseCase,
    private readonly _verifyResetOtpUseCase: IVerifyResetOtpUseCase,
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,
    private readonly _resendResetOtpUseCase: IResendResetOtpUseCase,
  ) {}

  async inviteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this._inviteUserUseCase.execute(req.body);

      sendSuccess(res, HttpStatusCode.CREATED, "User invitation sent successfully.", response);
    } catch (error) {
      next(error);
    }
  }

  async activateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._activateAccountUseCase.execute(req.body);

      sendSuccess(res, HttpStatusCode.OK, "Account activated successfully.", response);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._loginUseCase.execute(req.body);

      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: env.refreshTokenExpiresInDays * 24 * 60 * 60 * 1000,
      });

      sendSuccess(res, HttpStatusCode.OK, "Login successful.", {
        accessToken: response.accessToken,
        user: response.user,
      });
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        sendError(res, HttpStatusCode.UNAUTHORIZED, "Refresh token is missing.");
        return;
      }

      const response = await this._refreshTokenUseCase.execute({
        refreshToken,
      });

      sendSuccess(res, HttpStatusCode.OK, "Access token refreshed successfully.", response);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        sendError(res, HttpStatusCode.UNAUTHORIZED, "Refresh token is missing.");

        return;
      }

      const response = await this._logoutUseCase.execute({
        refreshToken,
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      sendSuccess(res, HttpStatusCode.OK, "Logout successful.", response);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this._forgotPasswordUseCase.execute(req.body);

      sendSuccess(res, HttpStatusCode.OK, "Password reset OTP sent successfully.", response);
    } catch (error) {
      next(error);
    }
  }

  async verifyResetOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._verifyResetOtpUseCase.execute(req.body);

      sendSuccess(res, HttpStatusCode.OK, "OTP verified successfully.", response);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this._resetPasswordUseCase.execute(req.body);

      sendSuccess(res, HttpStatusCode.OK, "Password reset successfully.", response);
    } catch (error) {
      next(error);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._resendResetOtpUseCase.execute(req.body);

      sendSuccess(res, HttpStatusCode.OK, "Password reset OTP resent successfully.", response);
    } catch (error) {
      next(error);
    }
  }
}
