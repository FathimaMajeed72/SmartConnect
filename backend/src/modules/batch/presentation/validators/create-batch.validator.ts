import { z } from "zod";

export const createBatchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Batch name is required.")
    .max(50, "Batch name cannot exceed 50 characters."),

  classTeacherId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid teacher ID."),

  capacity: z.number().int("Capacity must be an integer.").min(1, "Capacity must be at least 1."),
});
