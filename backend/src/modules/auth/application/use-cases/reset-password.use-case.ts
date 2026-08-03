import { ResetPasswordRequest } from "../dtos/reset-password.request";
import { ResetPasswordResponse } from "../dtos/reset-password.response";

import { UserRepository } from "../../domain/repositories/user.repository";
import { UserTokenRepository } from "../../domain/repositories/user-token.repository";

import { PasswordHasher } from "../interfaces/password-hasher.interface";

import { InvalidOtpError } from "../errors/invalid-otp.error";

import { TokenType } from "../../domain/enums/token-type.enum";

export class ResetPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly userTokenRepository: UserTokenRepository,

    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const user = await this.userRepository.findByEmail(request.email);

    if (!user) {
      throw new InvalidOtpError();
    }

    const resetToken = await this.userTokenRepository.findByUserIdAndType(
      user.id,
      TokenType.RESET_PASSWORD,
    );

    if (!resetToken) {
      throw new InvalidOtpError();
    }

    if (!resetToken.usedAt) {
      throw new InvalidOtpError();
    }

    user.passwordHash = await this.passwordHasher.hash(request.password);

    user.passwordChangedAt = new Date();
    user.updatedAt = new Date();

    await this.userRepository.update(user);

    await this.userTokenRepository.deleteByUserIdAndType(user.id, TokenType.RESET_PASSWORD);

    return {
      message: "Password reset successfully.",
    };
  }
}
