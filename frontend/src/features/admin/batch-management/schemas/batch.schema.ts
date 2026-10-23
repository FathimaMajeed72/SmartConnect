import { z } from "zod";

export const batchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Batch name is required.")
    .max(50, "Batch name cannot exceed 50 characters."),

  classTeacherId: z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, "Please select a valid class teacher."),

  capacity: z
    .number({
      error: "Capacity is required.",
    })
    .int("Capacity must be a whole number.")
    .min(1, "Capacity must be at least 1."),
});

export type BatchFormValues = z.infer<typeof batchSchema>;