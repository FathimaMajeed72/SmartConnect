import { z } from "zod";

export const createStudentSchema = z.object({
  admissionNumber: z
    .string()
    .trim()
    .min(2, "Admission number must be at least 2 characters")
    .max(30, "Admission number must not exceed 30 characters"),

  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),

  dateOfBirth: z
    .string()
    .trim()
    .min(1, "Date of birth is required.")
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of birth must be in YYYY-MM-DD format.",
    )
    .refine((value) => {
      const date = new Date(`${value}T00:00:00.000Z`);

      return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === value
      );
    }, "Please enter a valid date of birth.")
    .refine(
      (value) => value <= new Date().toISOString().slice(0, 10),
      "Date of birth cannot be in the future.",
    ),

  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    error: "Please select a gender.",
  }),

  profileImage: z
    .string()
    .trim()
    .transform((value) => value || undefined)
    .optional(),
});

export type CreateStudentFormData = z.infer<
  typeof createStudentSchema
>;
