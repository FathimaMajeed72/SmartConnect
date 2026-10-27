export const STUDENT_PARENT_ROUTES = {
  ROOT: "/",
  BY_STUDENT: "/:studentId/parents",
  STATUS: "/:studentId/parents/:parentUserId/status",
  UPDATE: "/:studentId/parents/:parentUserId",
} as const;