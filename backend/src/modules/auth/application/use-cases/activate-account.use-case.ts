import { ActivateAccountRequest } from "../dtos/activate-account.request";
import { ActivateAccountResponse } from "../dtos/activate-account.response";

import { UserRepository } from "../../domain/repositories/user.repository";
import { UserTokenRepository } from "../../domain/repositories/user-token.repository";

import { PasswordHasher } from "../interfaces/password-hasher.interface";
import { TokenHasher } from "../interfaces/token-hasher.interface";
import { InvalidActivationTokenError } from "../errors/invalid-activation-token.error";
import { ActivationTokenExpiredError } from "../errors/activation-token-expired.error";
import { UserStatus } from "../../domain/enums/user-status.enum";
import { TokenType } from "../../domain/enums/token-type.enum";

export class ActivateAccountUseCase {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly userTokenRepository: UserTokenRepository,

    private readonly passwordHasher: PasswordHasher,

    private readonly tokenHasher: TokenHasher,
  ) {}

  async execute(request: ActivateAccountRequest): Promise<ActivateAccountResponse> {
    const tokenHash = this.tokenHasher.hash(request.token);

    const userToken = await this.userTokenRepository.findByToken(tokenHash, TokenType.ACTIVATION);

    if (!userToken) {
      throw new InvalidActivationTokenError();
    }

    if (userToken.expiresAt < new Date()) {
      throw new ActivationTokenExpiredError();
    }

    if (userToken.usedAt) {
      throw new InvalidActivationTokenError();
    }

    const user = await this.userRepository.findById(userToken.userId);

    if (!user) {
      throw new InvalidActivationTokenError();
    }

    if (user.status !== UserStatus.INVITED) {
      throw new InvalidActivationTokenError();
    }

    const passwordHash = await this.passwordHasher.hash(request.password);

    const now = new Date();

    user.passwordHash = passwordHash;

    user.status = UserStatus.ACTIVE;

    user.isEmailVerified = true;

    user.passwordChangedAt = now;

    await this.userRepository.update(user);

    userToken.usedAt = now;

    await this.userTokenRepository.update(userToken);

    return {
      message: "Account activated successfully.",
    };
  }
}
