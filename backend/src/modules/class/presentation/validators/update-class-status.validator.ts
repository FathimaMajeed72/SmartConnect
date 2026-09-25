import { z } from "zod";

import { ClassStatus } from "../../domain/enums/class-status.enum";

export const updateClassStatusSchema = z.object({
  status: z.enum(ClassStatus),
});