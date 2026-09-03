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

      res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: "User invitation sent successfully.",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async activateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._activateAccountUseCase.execute(req.body);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Account activated successfully.",
        data: response,
      });
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
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Login successful.",
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
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Refresh token is missing.",
        });
        return;
      }

      console.log("Refresh Token:", refreshToken);

      const response = await this._refreshTokenUseCase.execute({
        refreshToken,
      });

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Access token refreshed successfully.",
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
        res.status(HttpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Refresh token is missing.",
        });

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

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Logout successful.",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this._forgotPasswordUseCase.execute(req.body);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Password reset OTP sent successfully.",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyResetOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._verifyResetOtpUseCase.execute(req.body);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "OTP verified successfully.",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this._resetPasswordUseCase.execute(req.body);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Password reset successfully.",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this._resendResetOtpUseCase.execute(req.body);

      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Password reset OTP resent successfully.",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
