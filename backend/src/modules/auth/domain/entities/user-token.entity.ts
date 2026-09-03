import { IBaseEntity } from "../../../../shared/domain/entities/base.entity";
import { TokenType } from "../enums/token-type.enum";

export interface UserToken extends IBaseEntity {

  userId: string;

  tokenHash: string;

  type: TokenType;

  expiresAt: Date;

  usedAt: Date | null;

  createdAt: Date;
}
