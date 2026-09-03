import { TokenType } from "../../domain/enums/token-type.enum";
import { IUserTokenRepository } from "../../domain/repositories/user-token.repository";
import { LogoutRequest } from "../dtos/logout.request";
import { LogoutResponse } from "../dtos/logout.response";
import { InvalidRefreshTokenError } from "../errors/invalid-refresh-token.error";
import { ITokenHasher } from "../interfaces/token-hasher.interface";
import { ITokenService } from "../interfaces/token.service.interface";
import { ILogoutUseCase } from "../use-case-interfaces/logout.use-case.interface";

export class LogoutUseCase implements ILogoutUseCase {
  constructor(
    private readonly _userTokenRepository: IUserTokenRepository,

    private readonly _tokenHasher: ITokenHasher,

    private readonly _tokenService: ITokenService,
  ) {}

  async execute(request: LogoutRequest): Promise<LogoutResponse> {
    await this._tokenService.verifyRefreshToken(request.refreshToken);

    const tokenHash = this._tokenHasher.hash(request.refreshToken);

    const storedToken = await this._userTokenRepository.findByToken(tokenHash, TokenType.REFRESH);

    if (!storedToken) {
      throw new InvalidRefreshTokenError();
    }

    await this._userTokenRepository.deleteByToken(tokenHash);

    return {
      message: "Logged out successfully.",
    };
  }
}
