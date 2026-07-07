import { LoginRequest } from "../dtos/login.request";
import { LoginResponse } from "../dtos/login.response";

import { UserRepository } from "../../domain/repositories/user.repository";
import { UserTokenRepository } from "../../domain/repositories/user-token.repository";

import { PasswordHasher } from "../interfaces/password-hasher.interface";
import { TokenHasher } from "../interfaces/token-hasher.interface";
import { TokenService } from "../interfaces/token.service.interface";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";
import { UserNotActiveError } from "../errors/user-not-active.error";
import { UserStatus } from "../../domain/enums/user-status.enum";
import { env } from "../../../../config/env";
import { TokenType } from "../../domain/enums/token-type.enum";
import { UserToken } from "../../domain/entities/user-token.entity";

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly userTokenRepository: UserTokenRepository,

    private readonly passwordHasher: PasswordHasher,

    private readonly tokenHasher: TokenHasher,

    private readonly tokenService: TokenService,
  ) {}
async execute(request: LoginRequest): Promise<LoginResponse> {
  
    const user = await this.userRepository.findByEmail(request.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UserNotActiveError();
    }

    if (!user.passwordHash) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this.passwordHasher.compare(request.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const accessToken = await this.tokenService.generateAccessToken(user.id, user.role);

    const refreshToken = await this.tokenService.generateRefreshToken(user.id);

    const refreshTokenHash = this.tokenHasher.hash(refreshToken);

    await this.userTokenRepository.deleteByUserIdAndType(user.id, TokenType.REFRESH);

    const userToken: UserToken = {
      id: "",

      userId: user.id,

      tokenHash: refreshTokenHash,

      type: TokenType.REFRESH,

      expiresAt: new Date(Date.now() + env.refreshTokenExpiresInDays * 24 * 60 * 60 * 1000),

      usedAt: null,

      createdAt: new Date(),
    };

    await this.userTokenRepository.create(userToken);

    user.lastLogin = new Date();

    await this.userRepository.update(user);

    return {
      accessToken,

      refreshToken,

      user: {
        id: user.id,

        firstName: user.firstName,

        lastName: user.lastName,

        email: user.email,

        role: user.role,
      },
    };
  }
}
