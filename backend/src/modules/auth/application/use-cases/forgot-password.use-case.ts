import { env } from "../../../../config/env";
import { UserToken } from "../../domain/entities/user-token.entity";
import { TokenType } from "../../domain/enums/token-type.enum";
import { UserTokenRepository } from "../../domain/repositories/user-token.repository";
import { UserRepository } from "../../domain/repositories/user.repository";
import { ForgotPasswordRequest } from "../dtos/forgot-password.request";
import { ForgotPasswordResponse } from "../dtos/forgot-password.response";
import { AuthEmailService } from "../interfaces/auth-email.service.interface";
import { OtpGenerator } from "../interfaces/otp-generator.interface";
import { TokenHasher } from "../interfaces/token-hasher.interface";

export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly userTokenRepository: UserTokenRepository,

    private readonly otpGenerator: OtpGenerator,

    private readonly tokenHasher: TokenHasher,

    private readonly emailService: AuthEmailService,
  ) {}
  async execute(request: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const user = await this.userRepository.findByEmail(request.email);

    
    if (!user) {
      return {
        message: "If an account exists, an OTP has been sent to the registered email.",
      };
    }

    await this.userTokenRepository.deleteByUserIdAndType(user.id, TokenType.RESET_PASSWORD);

    const otp = this.otpGenerator.generate();

    const tokenHash = this.tokenHasher.hash(otp);

    const userToken: UserToken = {
      id: "",

      userId: user.id,

      tokenHash,

      type: TokenType.RESET_PASSWORD,

      expiresAt: new Date(Date.now() + env.resetPasswordOtpExpiresInMinutes * 60 * 1000),

      usedAt: null,

      createdAt: new Date(),
    };

    await this.userTokenRepository.create(userToken);

    await this.emailService.sendPasswordResetOtpEmail(user.firstName, user.email, otp);

    return {
      message: "If an account exists, an OTP has been sent to the registered email.",
    };
  }
}
