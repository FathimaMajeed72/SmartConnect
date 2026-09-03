import { RefreshTokenRequest } from "../dtos/refresh-token.request";
import { RefreshTokenResponse } from "../dtos/refresh-token.response";

import { IUserRepository } from "../../domain/repositories/user.repository";
import { IUserTokenRepository } from "../../domain/repositories/user-token.repository";

import { ITokenHasher } from "../interfaces/token-hasher.interface";
import { ITokenService } from "../interfaces/token.service.interface";

import { InvalidRefreshTokenError } from "../errors/invalid-refresh-token.error";
import { RefreshTokenExpiredError } from "../errors/refresh-token-expired.error";

import { UserStatus } from "../../domain/enums/user-status.enum";
import { TokenType } from "../../domain/enums/token-type.enum";
import { IRefreshTokenUseCase } from "../use-case-interfaces/refresh-token.use-case.interface";

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,

    private readonly _userTokenRepository: IUserTokenRepository,

    private readonly _tokenHasher: ITokenHasher,

    private readonly _tokenService: ITokenService,
  ) {}

  async execute(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    console.log("1. Verify token");
    await this._tokenService.verifyRefreshToken(request.refreshToken);

    console.log("2. Hash token");
    const tokenHash = this._tokenHasher.hash(request.refreshToken);

    console.log("Generated hash:", tokenHash);

    console.log("3. Find stored token");
    const storedToken = await this._userTokenRepository.findByToken(tokenHash, TokenType.REFRESH);

    console.log(storedToken);

    if (!storedToken) {
      throw new InvalidRefreshTokenError();
    }

    if (storedToken.expiresAt < new Date()) {
      throw new RefreshTokenExpiredError();
    }

    const user = await this._userRepository.findById(storedToken.userId);

    if (!user) {
      throw new InvalidRefreshTokenError();
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new InvalidRefreshTokenError();
    }

    const accessToken = await this._tokenService.generateAccessToken(user.id, user.role);

    return {
      accessToken,
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
