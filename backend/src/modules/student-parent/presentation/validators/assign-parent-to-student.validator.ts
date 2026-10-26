import { z } from "zod";

import { StudentParentRelationship } from "../../domain/enums/student-parent-relationship.enum";

export const assignParentToStudentSchema = z.object({
  parentUserId: z
    .string()
    .trim()
    .min(1, "Parent user ID is required.")
    .refine(
      (id) => /^[0-9a-fA-F]{24}$/.test(id),
      "A valid parent user ID is required.",
    ),

  relationship: z.enum(StudentParentRelationship),

  isPrimaryContact: z.boolean(),
});