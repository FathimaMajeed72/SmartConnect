import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Subject name must be at least 2 characters long."),

  code: z
    .string()
    .trim()
    .min(2, "Subject code must be at least 2 characters long."),
});