import { z } from "zod";
import { Gender } from "../../domain/enums/gender.enum";

export const createStudentSchema = z.object({
  admissionNumber: z
    .string()
    .trim()
    .min(1, "Admission number is required.")
    .max(50, "Admission number cannot exceed 50 characters."),

  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(100, "First name cannot exceed 100 characters."),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(100, "Last name cannot exceed 100 characters."),

  dateOfBirth: z.coerce
    .date()
    .refine((date) => !Number.isNaN(date.getTime()), "A valid date of birth is required.")
    .refine((date) => date <= new Date(), "Date of birth cannot be in the future."),

  gender: z.enum(Gender),

  profileImage: z.string().trim().optional(),
});
