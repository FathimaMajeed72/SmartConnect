import { z } from "zod";

export const addParentSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters."),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required."),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address."),

  phone: z
    .string()
    .trim()
    .optional(),
});