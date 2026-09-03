import jwt from "jsonwebtoken";

import { env } from "../../../../config/env";

import { Role } from "../../domain/enums/role.enum";

import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from "../../application/types/jwt-payload.type";

import { ITokenService } from "../../application/interfaces/token.service.interface";

export class JwtTokenService implements ITokenService {
  async generateAccessToken(
    userId: string,
    role: Role
  ): Promise<string> {
     return jwt.sign(
        {
        userId,
        role,
        },
        env.jwt.accessSecret,
        {
        expiresIn: env.jwt.accessExpiresIn,
        }
    );
  }

  async generateRefreshToken(
    userId: string
  ): Promise<string> {
    return jwt.sign(
        {
        userId,
        },
        env.jwt.refreshSecret,
        {
        expiresIn: env.jwt.refreshExpiresIn,
        }
    );
  }

  async verifyAccessToken(
    token: string
  ): Promise<AccessTokenPayload> {
    return jwt.verify(
        token,
        env.jwt.accessSecret
    ) as AccessTokenPayload;
  }

  async verifyRefreshToken(
    token: string
  ): Promise<RefreshTokenPayload> {
    return jwt.verify(
        token,
        env.jwt.refreshSecret
    ) as RefreshTokenPayload;
  }
}