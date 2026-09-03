import { RefreshTokenRequest } from "../dtos/refresh-token.request";
import { RefreshTokenResponse } from "../dtos/refresh-token.response";

export interface IRefreshTokenUseCase {
  execute(request: RefreshTokenRequest): Promise<RefreshTokenResponse>;
}