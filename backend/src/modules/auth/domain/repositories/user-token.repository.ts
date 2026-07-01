import { CreateUserToken } from "../../application/types/create-user-token.type";
import { UserToken } from "../entities/user-token.entity";
import { TokenType } from "../enums/token-type.enum";

export interface UserTokenRepository {
  create(token: CreateUserToken): Promise<UserToken>;

  findByToken(tokenHash: string): Promise<UserToken | null>;

  findByUserIdAndType(
    userId: string,
    type: TokenType
  ): Promise<UserToken | null>;

  deleteByToken(tokenHash: string): Promise<void>;

  deleteByUserIdAndType(
    userId: string,
    type: TokenType
  ): Promise<void>;
}