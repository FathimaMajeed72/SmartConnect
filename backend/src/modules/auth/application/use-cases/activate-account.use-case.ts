import { ActivateAccountRequest } from "../dtos/activate-account.request";
import { ActivateAccountResponse } from "../dtos/activate-account.response";

import { IUserRepository } from "../../domain/repositories/user.repository";
import { IUserTokenRepository } from "../../domain/repositories/user-token.repository";

import { IPasswordHasher } from "../interfaces/password-hasher.interface";
import { ITokenHasher } from "../interfaces/token-hasher.interface";
import { InvalidActivationTokenError } from "../errors/invalid-activation-token.error";
import { ActivationTokenExpiredError } from "../errors/activation-token-expired.error";
import { UserStatus } from "../../domain/enums/user-status.enum";
import { TokenType } from "../../domain/enums/token-type.enum";
import { IActivateAccountUseCase } from "../use-case-interfaces/activate-account.use-case.interface";

export class ActivateAccountUseCase implements IActivateAccountUseCase{
  constructor(
    private readonly _userRepository: IUserRepository,

    private readonly _userTokenRepository: IUserTokenRepository,

    private readonly _passwordHasher: IPasswordHasher,

    private readonly _tokenHasher: ITokenHasher,
  ) {}

  async execute(request: ActivateAccountRequest): Promise<ActivateAccountResponse> {
    const tokenHash = this._tokenHasher.hash(request.token);

    const userToken = await this._userTokenRepository.findByToken(tokenHash, TokenType.ACTIVATION);

    if (!userToken) {
      throw new InvalidActivationTokenError();
    }

    if (userToken.expiresAt < new Date()) {
      throw new ActivationTokenExpiredError();
    }

    if (userToken.usedAt) {
      throw new InvalidActivationTokenError();
    }

    const user = await this._userRepository.findById(userToken.userId);

    if (!user) {
      throw new InvalidActivationTokenError();
    }

    if (user.status !== UserStatus.INVITED) {
      throw new InvalidActivationTokenError();
    }

    const passwordHash = await this._passwordHasher.hash(request.password);

    const now = new Date();

    user.passwordHash = passwordHash;

    user.status = UserStatus.ACTIVE;

    user.isEmailVerified = true;

    user.passwordChangedAt = now;

    await this._userRepository.update(user);

    userToken.usedAt = now;

    await this._userTokenRepository.update(userToken);

    return {
      message: "Account activated successfully.",
    };
  }
}
