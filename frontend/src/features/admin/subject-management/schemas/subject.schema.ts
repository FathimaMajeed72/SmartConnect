import { z } from "zod";

export const subjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Subject name must be at least 2 characters.",
    ),

  code: z
    .string()
    .trim()
    .min(
      2,
      "Subject code must be at least 2 characters.",
    ),
});

export const updateSubjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Subject name must be at least 2 characters.",
    ),

  code: z
    .string()
    .trim()
    .min(
      2,
      "Subject code must be at least 2 characters.",
    ),
});

export type SubjectFormData = z.infer<typeof subjectSchema>;

export type UpdateSubjectFormData =
  z.infer<typeof updateSubjectSchema>;