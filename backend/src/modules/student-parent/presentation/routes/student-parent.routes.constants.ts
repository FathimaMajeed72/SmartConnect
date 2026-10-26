export const STUDENT_PARENT_ROUTES = {
  ROOT: "/",
  BY_STUDENT: "/:studentId/parents",
  STATUS: "/:studentId/parents/:parentUserId/status",
} as const;