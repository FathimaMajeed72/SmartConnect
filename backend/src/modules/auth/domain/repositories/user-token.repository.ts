import { UserToken } from "../entities/user-token.entity";
import { TokenType } from "../enums/token-type.enum";

export interface UserTokenRepository {
  create(token: UserToken): Promise<UserToken>;

  findByToken(tokenHash: string, type: TokenType): Promise<UserToken | null>;

  findByUserIdAndType(userId: string, type: TokenType): Promise<UserToken | null>;

  update(token: UserToken): Promise<UserToken>;

  deleteByToken(tokenHash: string): Promise<void>;

  deleteByUserIdAndType(userId: string, type: TokenType): Promise<void>;
}
