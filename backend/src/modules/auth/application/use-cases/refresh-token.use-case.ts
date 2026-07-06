import { RefreshTokenRequest } from "../dtos/refresh-token.request";
import { RefreshTokenResponse } from "../dtos/refresh-token.response";

import { UserRepository } from "../../domain/repositories/user.repository";
import { UserTokenRepository } from "../../domain/repositories/user-token.repository";

import { TokenHasher } from "../interfaces/token-hasher.interface";
import { TokenService } from "../interfaces/token.service.interface";

import { InvalidRefreshTokenError } from "../errors/invalid-refresh-token.error";
import { RefreshTokenExpiredError } from "../errors/refresh-token-expired.error";

import { UserStatus } from "../../domain/enums/user-status.enum";

export class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: UserRepository,

    private readonly userTokenRepository: UserTokenRepository,

    private readonly tokenHasher: TokenHasher,

    private readonly tokenService: TokenService,
  ) {}

  async execute(
    request: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {

    await this.tokenService.verifyRefreshToken(
      request.refreshToken
    );

    const tokenHash = this.tokenHasher.hash(
      request.refreshToken
    );

    const storedToken =
      await this.userTokenRepository.findByToken(tokenHash);

    if (!storedToken) {
      throw new InvalidRefreshTokenError();
    }

    if (storedToken.expiresAt < new Date()) {
      throw new RefreshTokenExpiredError();
    }

    const user = await this.userRepository.findById(
      storedToken.userId
    );

    if (!user) {
      throw new InvalidRefreshTokenError();
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new InvalidRefreshTokenError();
    }

    const accessToken =
      await this.tokenService.generateAccessToken(
        user.id,
        user.role
      );

    return {
      accessToken,
    };
  }
}