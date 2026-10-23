export const BATCH_ROUTES = {
  ROOT: "/",
  BY_CLASS: "/:classId/batches",
  BY_ID: "/:classId/batches/:batchId",
  AVAILABLE_CLASS_TEACHERS: "/available-class-teachers",
} as const;