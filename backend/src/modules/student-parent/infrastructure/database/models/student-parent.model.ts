import { Schema, model, type Document, Types } from "mongoose";

import { StudentParentRelationship } from "../../../domain/enums/student-parent-relationship.enum";
import { StudentParentStatus } from "../../../domain/enums/student-parent-status.enum";

export interface IStudentParentDocument extends Document {
  studentId: Types.ObjectId;
  parentUserId: Types.ObjectId;
  relationship: StudentParentRelationship;
  isPrimaryContact: boolean;
  status: StudentParentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const studentParentSchema = new Schema<IStudentParentDocument>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    parentUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    relationship: {
      type: String,
      enum: Object.values(StudentParentRelationship),
      required: true,
    },

    isPrimaryContact: {
      type: Boolean,
      required: true,
      default: false,
    },

    status: {
      type: String,
      enum: Object.values(StudentParentStatus),
      required: true,
      default: StudentParentStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

studentParentSchema.index(
  {
    studentId: 1,
    parentUserId: 1,
  },
  {
    unique: true,
  },
);

studentParentSchema.index(
  { studentId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isPrimaryContact: true,
      status: StudentParentStatus.ACTIVE,
    },
  },
);

export const StudentParentModel = model<IStudentParentDocument>(
  "StudentParent",
  studentParentSchema,
);
