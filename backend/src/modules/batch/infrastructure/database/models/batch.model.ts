import { Schema, Types, model, type Document } from "mongoose";

import { BatchStatus } from "../../../domain/enums/batch-status.enum";

export interface IBatchDocument extends Document {
  name: string;
  classId: Types.ObjectId;
  classTeacherId: Types.ObjectId | null;
  capacity: number;
  status: BatchStatus;
  createdAt: Date;
  updatedAt: Date;
}

const batchSchema = new Schema<IBatchDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    classTeacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      default : null,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: Object.values(BatchStatus),
      default: BatchStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

batchSchema.index(
  { classId: 1, name: 1 },
  { unique: true }
);

export const BatchModel = model<IBatchDocument>(
  "Batch",
  batchSchema
);