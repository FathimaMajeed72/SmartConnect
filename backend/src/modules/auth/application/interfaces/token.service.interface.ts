import { AccessTokenPayload, RefreshTokenPayload } from "../types/jwt-payload.type";
import { Role } from "../../domain/enums/role.enum";

export interface ITokenService {
  generateAccessToken(userId: string, role: Role): Promise<string>;

  generateRefreshToken(userId: string): Promise<string>;

  verifyAccessToken(token: string): Promise<AccessTokenPayload>;

  verifyRefreshToken(token: string): Promise<RefreshTokenPayload>;
}