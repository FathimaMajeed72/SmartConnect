import { env } from "../../../../config/env";

import { UserToken } from "../../domain/entities/user-token.entity";
import { TokenType } from "../../domain/enums/token-type.enum";

import { IUserRepository } from "../../domain/repositories/user.repository";
import { IUserTokenRepository } from "../../domain/repositories/user-token.repository";

import { IAuthEmailService } from "../interfaces/auth-email.service.interface";
import { IOtpGenerator } from "../interfaces/otp-generator.interface";
import { ITokenHasher } from "../interfaces/token-hasher.interface";

import { UserNotFoundError } from "../errors/user-not-found.error";

import { ResendResetOtpRequest } from "../dtos/resend-reset-otp.request";
import { ResendResetOtpResponse } from "../dtos/resend-reset-otp.response";
import { IResendResetOtpUseCase } from "../use-case-interfaces/resend-reset-otp.use-case.interface";


export class ResendResetOtpUseCase implements IResendResetOtpUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userTokenRepository: IUserTokenRepository,
    private readonly _otpGenerator: IOtpGenerator,
    private readonly _tokenHasher: ITokenHasher,
    private readonly _emailService: IAuthEmailService,
  ) {}

  async execute(request: ResendResetOtpRequest): Promise<ResendResetOtpResponse> {
    const user = await this._userRepository.findByEmail(request.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    await this._userTokenRepository.deleteByUserIdAndType(user.id, TokenType.RESET_PASSWORD);

    const otp = this._otpGenerator.generate();

    const otpHash = this._tokenHasher.hash(otp);

    const userToken: UserToken = {
      id: "",

      userId: user.id,

      tokenHash: otpHash,

      type: TokenType.RESET_PASSWORD,

      expiresAt: new Date(Date.now() + env.resetPasswordOtpExpiresInMinutes * 60 * 1000),

      usedAt: null,

      createdAt: new Date(),
    };

    await this._userTokenRepository.create(userToken);

    await this._emailService.sendPasswordResetOtpEmail(user.firstName, user.email, otp);

    return {
      message: "OTP resent successfully.",
    };
  }
}
