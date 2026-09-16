import { z } from "zod";

export const addTeacherSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must not exceed 50 characters"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .transform((value) => value || undefined)
    .optional(),

  qualification: z
    .string()
    .trim()
    .min(2, "Qualification must be at least 2 characters")
    .max(100, "Qualification must not exceed 100 characters"),

  joiningDate: z
    .string()
    .trim()
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      "Please enter a valid joining date",
    )
    .refine(
      (value) => new Date(value) <= new Date(),
      "Joining date cannot be in the future",
    ),
});