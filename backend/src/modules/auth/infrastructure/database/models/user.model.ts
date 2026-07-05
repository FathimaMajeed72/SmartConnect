import { Schema, model, HydratedDocument } from "mongoose";

import { Role } from "../../../domain/enums/role.enum";
import { UserStatus } from "../../../domain/enums/user-status.enum";

export interface UserDocument {
  firstName: string;
  lastName: string;

  email: string;
  phone: string | null;

  passwordHash: string | null;

  role: Role;
  status: UserStatus;

  isEmailVerified: boolean;

  lastLogin?: Date;
  passwordChangedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type HydratedUserDocument = HydratedDocument<UserDocument>;

const userSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    passwordHash: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.INVITED,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
    },

    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });

export const UserModel = model<UserDocument>("User", userSchema);