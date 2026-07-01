import { TokenType } from "../../domain/enums/token-type.enum";

export interface CreateUserToken {
  userId: string;

  tokenHash: string;

  type: TokenType;

  expiresAt: Date;
}