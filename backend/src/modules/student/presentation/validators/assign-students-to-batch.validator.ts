import { z } from "zod";
import { Types } from "mongoose";

export const assignStudentsToBatchSchema = z.object({
  batchId: z
    .string()
    .refine((id) => Types.ObjectId.isValid(id), {
      message: "Invalid batch id.",
    }),

  studentIds: z
    .array(
      z.string().refine((id) => Types.ObjectId.isValid(id), {
        message: "Invalid student id.",
      }),
    )
    .min(1, "At least one student must be selected.")
    .refine((ids) => new Set(ids).size === ids.length, {
      message: "Duplicate student ids are not allowed.",
    }),
});