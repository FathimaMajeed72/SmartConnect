import { Schema, model, HydratedDocument, Types } from "mongoose";

import { TokenType } from "../../../domain/enums/token-type.enum";

export interface UserTokenDocument {
  userId: Types.ObjectId;

  type: TokenType;

  tokenHash: string;

  expiresAt: Date;

  usedAt?: Date | null;

  createdAt: Date;

  updatedAt: Date;
}

export type HydratedUserTokenDocument =
  HydratedDocument<UserTokenDocument>;

const userTokenSchema = new Schema<UserTokenDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(TokenType),
      required: true,
    },

    tokenHash: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    usedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userTokenSchema.index({ userId: 1 });

userTokenSchema.index({ tokenHash: 1 });

userTokenSchema.index({ expiresAt: 1 });

export const UserTokenModel = model<UserTokenDocument>(
  "UserToken",
  userTokenSchema
);