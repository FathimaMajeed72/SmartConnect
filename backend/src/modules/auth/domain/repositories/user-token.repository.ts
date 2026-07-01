import { UserToken } from "../entities/user-token.entity";
import { TokenType } from "../enums/token-type.enum";

export interface UserTokenRepository {
  create(token: UserToken): Promise<UserToken>;

  findByTokenHash(tokenHash: string): Promise<UserToken | null>;

  findByUserId(
    userId: string,
    type: TokenType
  ): Promise<UserToken | null>;

  delete(id: string): Promise<void>;

  deleteByUserId(userId: string, type: TokenType): Promise<void>;
} 