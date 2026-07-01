import { TokenType } from "../enums/token-type.enum";

export interface UserToken {
  id: string;

  userId: string;

  tokenHash: string;

  type: TokenType;

  expiresAt: Date;

  usedAt?: Date;

  createdAt: Date;
}