import { z } from "zod";

import { BatchStatus } from "../../domain/enums/batch-status.enum";

export const updateBatchStatusSchema = z
.object({
status: z.nativeEnum(BatchStatus),
classTeacherId: z.string().optional(),
})
.superRefine((data, ctx) => {
if (data.status === BatchStatus.ACTIVE && !data.classTeacherId) {
ctx.addIssue({
code: z.ZodIssueCode.custom,
path: ["classTeacherId"],
message: "A class teacher is required to activate a batch.",
});
}
});
