import { TokenType } from "../../domain/enums/token-type.enum";
import { UserTokenRepository } from "../../domain/repositories/user-token.repository";
import { LogoutRequest } from "../dtos/logout.request";
import { LogoutResponse } from "../dtos/logout.response";
import { InvalidRefreshTokenError } from "../errors/invalid-refresh-token.error";
import { TokenHasher } from "../interfaces/token-hasher.interface";
import { TokenService } from "../interfaces/token.service.interface";

export class LogoutUseCase {
  constructor(
    private readonly userTokenRepository: UserTokenRepository,

    private readonly tokenHasher: TokenHasher,

    private readonly tokenService: TokenService,
  ) {}

  async execute(request: LogoutRequest): Promise<LogoutResponse> {
    await this.tokenService.verifyRefreshToken(request.refreshToken);

    const tokenHash = this.tokenHasher.hash(request.refreshToken);

    const storedToken = await this.userTokenRepository.findByToken(tokenHash, TokenType.REFRESH);

    if (!storedToken) {
      throw new InvalidRefreshTokenError();
    }

    await this.userTokenRepository.deleteByToken(tokenHash);

    return {
      message: "Logged out successfully.",
    };
  }
}
