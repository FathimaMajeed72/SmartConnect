import { AccessTokenPayload, RefreshTokenPayload } from "../types/jwt-payload.type";

export interface TokenService {
  generateAccessToken(userId: string, role: string): Promise<string>;

  generateRefreshToken(userId: string): Promise<string>;

  verifyAccessToken(token: string): Promise<AccessTokenPayload>;

  verifyRefreshToken(token: string): Promise<RefreshTokenPayload>;
}