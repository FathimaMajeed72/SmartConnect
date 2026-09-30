import { z } from "zod";

export const createClassSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Class name must be at least 2 characters."),

  code: z
    .string()
    .trim()
    .min(2, "Class code must be at least 2 characters."),

  academicYear: z
    .string()
    .trim()
    .min(9, "Academic year must be in YYYY-YYYY format.")
    .regex(
      /^\d{4}-\d{4}$/,
      "Academic year must be in YYYY-YYYY format.",
    ),

  description: z
    .string()
    .trim()
    .optional(),
});