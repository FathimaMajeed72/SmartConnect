import { Schema, model, type Document } from "mongoose";

import { Gender } from "../../../domain/enums/gender.enum";
import { StudentStatus } from "../../../domain/enums/student-status.enum";

export interface IStudentDocument extends Document {
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
  profileImage?: string;
  status: StudentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudentDocument>(
  {
    admissionNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },

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

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },

    profileImage: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(StudentStatus),
      default: StudentStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);

export const StudentModel = model<IStudentDocument>(
  "Student",
  studentSchema,
);