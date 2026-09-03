import { env } from "../../../../config/env";
import { UserToken } from "../../domain/entities/user-token.entity";
import { TokenType } from "../../domain/enums/token-type.enum";
import { IUserTokenRepository } from "../../domain/repositories/user-token.repository";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { ForgotPasswordRequest } from "../dtos/forgot-password.request";
import { ForgotPasswordResponse } from "../dtos/forgot-password.response";
import { IAuthEmailService } from "../interfaces/auth-email.service.interface";
import { IOtpGenerator } from "../interfaces/otp-generator.interface";
import { ITokenHasher } from "../interfaces/token-hasher.interface";
import { IForgotPasswordUseCase } from "../use-case-interfaces/forgot-password.use-case.interface";

export class ForgotPasswordUseCase implements IForgotPasswordUseCase{
  constructor(
    private readonly _userRepository: IUserRepository,

    private readonly _userTokenRepository: IUserTokenRepository,

    private readonly _otpGenerator: IOtpGenerator,

    private readonly _tokenHasher: ITokenHasher,

    private readonly _emailService: IAuthEmailService,
  ) {}
  async execute(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const user = await this._userRepository.findByEmail(request.email);

    
    if (!user) {
      return {
        message: "If an account exists, an OTP has been sent to the registered email.",
      };
    }

    await this._userTokenRepository.deleteByUserIdAndType(user.id, TokenType.RESET_PASSWORD);

    const otp = this._otpGenerator.generate();

    const tokenHash = this._tokenHasher.hash(otp);

    const userToken: UserToken = {
      id: "",

      userId: user.id,

      tokenHash,

      type: TokenType.RESET_PASSWORD,

      expiresAt: new Date(Date.now() + env.resetPasswordOtpExpiresInMinutes * 60 * 1000),

      usedAt: null,

      createdAt: new Date(),
    };

    await this._userTokenRepository.create(userToken);

    await this._emailService.sendPasswordResetOtpEmail(user.firstName, user.email, otp);

    return {
      message: "If an account exists, an OTP has been sent to the registered email.",
    };
  }
}
