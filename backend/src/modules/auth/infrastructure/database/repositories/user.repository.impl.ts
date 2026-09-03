import { Types } from "mongoose";

import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { UserStatus } from "../../../domain/enums/user-status.enum";

import {
  UserDocument,
  HydratedUserDocument,
  UserModel,
} from "../models/user.model";

import { UserMapper } from "../mappers/user.mapper";

import { BaseRepositoryImpl } from "../../../../../shared/infrastructure/database/base.repository.impl";

export class UserRepositoryImpl
  extends BaseRepositoryImpl<User, UserDocument>
  implements IUserRepository {

  protected readonly _model = UserModel;

  protected toDomain(
    document: HydratedUserDocument,
  ): User {
    return UserMapper.toDomain(document);
  }

  protected toDocument(
    user: User,
  ): Partial<UserDocument> {
    return UserMapper.toDocument(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();

    const document = await this._model.findOne({
      email: normalizedEmail,
    });

    if (!document) {
      return null;
    }

    return this.toDomain(document);
  }

  async updateStatus(
    id: string,
    status: UserStatus,
  ): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user id.");
    }

    const document = await this._model.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!document) {
      throw new Error("User not found.");
    }

    return this.toDomain(document);
  }
}