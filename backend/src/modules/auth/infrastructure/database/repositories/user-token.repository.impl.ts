import { Types } from "mongoose";

import { UserToken } from "../../../domain/entities/user-token.entity";
import { IUserTokenRepository } from "../../../domain/repositories/user-token.repository";
import { TokenType } from "../../../domain/enums/token-type.enum";

import {
  UserTokenDocument,
  HydratedUserTokenDocument,
  UserTokenModel,
} from "../models/user-token.model";

import { UserTokenMapper } from "../mappers/user-token.mapper";

import { BaseRepositoryImpl } from "../../../../../shared/infrastructure/database/base.repository.impl";

export class UserTokenRepositoryImpl
  extends BaseRepositoryImpl<UserToken, UserTokenDocument>
  implements IUserTokenRepository {

  protected readonly _model = UserTokenModel;

  protected toDomain(
    document: HydratedUserTokenDocument,
  ): UserToken {
    return UserTokenMapper.toDomain(document);
  }

  protected toDocument(
    token: UserToken,
  ): Partial<UserTokenDocument> {
    return UserTokenMapper.toDocument(token);
  }

  async findByToken(
    tokenHash: string,
    type: TokenType,
  ): Promise<UserToken | null> {
    const document = await this._model.findOne({
      tokenHash,
      type,
    });

    if (!document) {
      return null;
    }

    return this.toDomain(document);
  }

  async findByUserIdAndType(
    userId: string,
    type: TokenType,
  ): Promise<UserToken | null> {
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }

    const document = await this._model.findOne({
      userId,
      type,
    });

    if (!document) {
      return null;
    }

    return this.toDomain(document);
  }

  async deleteByToken(tokenHash: string): Promise<void> {
    await this._model.deleteOne({
      tokenHash,
    });
  }

  async deleteByUserIdAndType(
    userId: string,
    type: TokenType,
  ): Promise<void> {
    if (!Types.ObjectId.isValid(userId)) {
      return;
    }

    await this._model.deleteOne({
      userId,
      type,
    });
  }
}