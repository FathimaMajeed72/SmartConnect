import { ResetPasswordRequest } from "../dtos/reset-password.request";
import { ResetPasswordResponse } from "../dtos/reset-password.response";

import { IUserRepository } from "../../domain/repositories/user.repository";
import { IUserTokenRepository } from "../../domain/repositories/user-token.repository";

import { IPasswordHasher } from "../interfaces/password-hasher.interface";

import { InvalidOtpError } from "../errors/invalid-otp.error";

import { TokenType } from "../../domain/enums/token-type.enum";
import { IResetPasswordUseCase } from "../use-case-interfaces/reset-password.use-case.interface";

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,

    private readonly _userTokenRepository: IUserTokenRepository,

    private readonly _passwordHasher: IPasswordHasher,
  ) {}

  async execute(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const user = await this._userRepository.findByEmail(request.email);

    if (!user) {
      throw new InvalidOtpError();
    }

    const resetToken = await this._userTokenRepository.findByUserIdAndType(
      user.id,
      TokenType.RESET_PASSWORD,
    );

    if (!resetToken) {
      throw new InvalidOtpError();
    }

    if (!resetToken.usedAt) {
      throw new InvalidOtpError();
    }

    user.passwordHash = await this._passwordHasher.hash(request.password);

    user.passwordChangedAt = new Date();
    user.updatedAt = new Date();

    await this._userRepository.update(user);

    await this._userTokenRepository.deleteByUserIdAndType(user.id, TokenType.RESET_PASSWORD);

    return {
      message: "Password reset successfully.",
    };
  }
}
