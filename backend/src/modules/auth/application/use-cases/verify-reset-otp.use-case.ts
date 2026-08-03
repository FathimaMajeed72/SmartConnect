import { TokenType } from "../../domain/enums/token-type.enum";
import { UserTokenRepository } from "../../domain/repositories/user-token.repository";
import { UserRepository } from "../../domain/repositories/user.repository";
import { VerifyResetOtpRequest } from "../dtos/verify-reset-otp.request";
import { VerifyResetOtpResponse } from "../dtos/verify-reset-otp.response";
import { InvalidOtpError } from "../errors/invalid-otp.error";
import { OtpExpiredError } from "../errors/otp-expired.error";
import { TokenHasher } from "../interfaces/token-hasher.interface";

export class VerifyResetOtpUseCase {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly userTokenRepository: UserTokenRepository,

    private readonly tokenHasher: TokenHasher,
  ) {}
  async execute(request: VerifyResetOtpRequest): Promise<VerifyResetOtpResponse> {
    const user = await this.userRepository.findByEmail(request.email);

    if (!user) {
      throw new InvalidOtpError();
    }

    const storedToken = await this.userTokenRepository.findByUserIdAndType(
      user.id,
      TokenType.RESET_PASSWORD,
    );

    if (!storedToken) {
      throw new InvalidOtpError();
    }

    if (storedToken.expiresAt < new Date()) {
      throw new OtpExpiredError();
    }

    if (storedToken.usedAt) {
      throw new InvalidOtpError();
    }

    const tokenHash = this.tokenHasher.hash(request.otp);

    if (storedToken.tokenHash !== tokenHash) {
      throw new InvalidOtpError();
    }

    storedToken.usedAt = new Date();

    await this.userTokenRepository.update(storedToken);

    return {
      message: "OTP verified successfully.",
    };
  }
}
