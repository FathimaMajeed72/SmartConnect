import { CreateUserToken } from "../../../application/types/create-user-token.type";
import { UserToken } from "../../../domain/entities/user-token.entity";
import { TokenType } from "../../../domain/enums/token-type.enum";
import { UserTokenRepository } from "../../../domain/repositories/user-token.repository";

import { UserTokenMapper } from "../mappers/user-token.mapper";
import { UserTokenModel } from "../models/user-token.model";

import { Types } from "mongoose";

export class UserTokenRepositoryImpl implements UserTokenRepository {

  async create(token: CreateUserToken): Promise<UserToken> {
    const document = await UserTokenModel.create(
        UserTokenMapper.createToDocument(token)
    );

    return UserTokenMapper.toDomain(document);
  }

  async findByToken(tokenHash: string): Promise<UserToken | null> {
    const document = await UserTokenModel.findOne({
        tokenHash,
    });

    if (!document) {
        return null;
    }

    return UserTokenMapper.toDomain(document);
  }

  async findByUserIdAndType(
    userId: string,
    type: TokenType
  ): Promise<UserToken | null> {
    if (!Types.ObjectId.isValid(userId)) {
        return null;
    }

    const document = await UserTokenModel.findOne({
        userId,
        type,
    });

    if (!document) {
        return null;
    }

    return UserTokenMapper.toDomain(document);
  }

  async deleteByToken(tokenHash: string): Promise<void> {
    await UserTokenModel.deleteOne({
        tokenHash,
    });
  }

  async deleteByUserIdAndType(
    userId: string,
    type: TokenType
  ): Promise<void> {
    if (!Types.ObjectId.isValid(userId)) {
        return;
    }

    await UserTokenModel.deleteOne({
        userId,
        type,
    });
  }
}