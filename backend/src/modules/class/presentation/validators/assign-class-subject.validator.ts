import { z } from "zod";
import { Types } from "mongoose";

export const assignClassSubjectSchema = z.object({
  subjectId: z
    .string()
    .trim()
    .refine(
      (id) => Types.ObjectId.isValid(id),
      "Invalid subject ID.",
    ),

  teacherId: z
    .string()
    .trim()
    .refine(
      (id) => Types.ObjectId.isValid(id),
      "Invalid teacher ID.",
    ),
});