import { z } from "zod";

export const classSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Class name must be at least 2 characters")
    .max(50, "Class name must not exceed 50 characters"),

  code: z
    .string()
    .trim()
    .min(2, "Class code must be at least 2 characters")
    .max(20, "Class code must not exceed 20 characters"),

  academicYear: z
    .string()
    .trim()
    .regex(
      /^\d{4}-\d{4}$/,
      "Academic year must be in YYYY-YYYY format.",
    ),

  description: z
    .string()
    .trim()
    .transform((value) => value || undefined)
    .optional(),
});

export type ClassFormData = z.infer<typeof classSchema>;


export const updateClassSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Class name must be at least 2 characters")
    .max(50, "Class name must not exceed 50 characters"),

  code: z
    .string()
    .trim()
    .min(2, "Class code must be at least 2 characters")
    .max(20, "Class code must not exceed 20 characters"),

  description: z
    .string()
    .trim()
    .transform((value) => value || undefined)
    .optional(),
});

export type UpdateClassFormData = z.infer<
  typeof updateClassSchema
>;