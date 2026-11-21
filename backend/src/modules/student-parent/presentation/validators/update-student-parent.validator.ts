import { z } from "zod";

import { StudentParentRelationship } from "../../domain/enums/student-parent-relationship.enum";

export const updateStudentParentSchema = z.object({
  relationship: z.enum(StudentParentRelationship),
  isPrimaryContact: z.boolean(),
});