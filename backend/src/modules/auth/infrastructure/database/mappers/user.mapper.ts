import { User } from "../../../domain/entities/user.entity";
import { HydratedUserDocument } from "../models/user.model";

export class UserMapper {
  
    // Converts a MongoDB document to a Domain Entity
   
  static toDomain(document: HydratedUserDocument): User {
    return {
      id: document._id.toString(),

      firstName: document.firstName,
      lastName: document.lastName,

      email: document.email,
      phone: document.phone,

      passwordHash: document.passwordHash,

      role: document.role,
      status: document.status,

      isEmailVerified: document.isEmailVerified,

      lastLogin: document.lastLogin,
      passwordChangedAt: document.passwordChangedAt,

      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  
   // Converts a User entity to a MongoDB document
  static toDocument(user: User) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,

      email: user.email,
      phone: user.phone,

      passwordHash: user.passwordHash,

      role: user.role,
      status: user.status,

      isEmailVerified: user.isEmailVerified,

      lastLogin: user.lastLogin,
      passwordChangedAt: user.passwordChangedAt,
    };
  }

}