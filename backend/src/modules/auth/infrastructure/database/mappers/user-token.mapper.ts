import { UserToken } from "../../../domain/entities/user-token.entity";
import { HydratedUserTokenDocument } from "../models/user-token.model";

export class UserTokenMapper {
  //Converts a MongoDB document to a Domain Entity.

  static toDomain(document: HydratedUserTokenDocument): UserToken {
    return {
      id: document._id.toString(),

      userId: document.userId.toString(),

      tokenHash: document.tokenHash,

      type: document.type,

      expiresAt: document.expiresAt,

      usedAt: document.usedAt,

      createdAt: document.createdAt,
    };
  }

  //Converts a CreateUserToken object into a MongoDB document.

  static toDocument(token: UserToken) {
    return {
      userId: token.userId,

      tokenHash: token.tokenHash,

      type: token.type,

      expiresAt: token.expiresAt,

      usedAt: token.usedAt,
    };
  }
}
