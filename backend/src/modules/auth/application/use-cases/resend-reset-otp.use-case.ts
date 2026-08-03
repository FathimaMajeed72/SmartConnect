import { env } from "../../../../config/env";

import { UserToken } from "../../domain/entities/user-token.entity";
import { TokenType } from "../../domain/enums/token-type.enum";

import { UserRepository } from "../../domain/repositories/user.repository";
import { UserTokenRepository } from "../../domain/repositories/user-token.repository";

import { AuthEmailService } from "../interfaces/auth-email.service.interface";
import { OtpGenerator } from "../interfaces/otp-generator.interface";
import { TokenHasher } from "../interfaces/token-hasher.interface";

import { UserNotFoundError } from "../errors/user-not-found.error";

import { ResendResetOtpRequest } from "../dtos/resend-reset-otp.request";
import { ResendResetOtpResponse } from "../dtos/resend-reset-otp.response";


export class ResendResetOtpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userTokenRepository: UserTokenRepository,
    private readonly otpGenerator: OtpGenerator,
    private readonly tokenHasher: TokenHasher,
    private readonly emailService: AuthEmailService,
  ) {}

  async execute(request: ResendResetOtpRequest): Promise<ResendResetOtpResponse> {
    const user = await this.userRepository.findByEmail(request.email);

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.userTokenRepository.deleteByUserIdAndType(user.id, TokenType.RESET_PASSWORD);

    const otp = this.otpGenerator.generate();

    const otpHash = this.tokenHasher.hash(otp);

    const userToken: UserToken = {
      id: "",

      userId: user.id,

      tokenHash: otpHash,

      type: TokenType.RESET_PASSWORD,

      expiresAt: new Date(Date.now() + env.resetPasswordOtpExpiresInMinutes * 60 * 1000),

      usedAt: null,

      createdAt: new Date(),
    };

    await this.userTokenRepository.create(userToken);

    await this.emailService.sendPasswordResetOtpEmail(user.firstName, user.email, otp);

    return {
      message: "OTP resent successfully.",
    };
  }
}
