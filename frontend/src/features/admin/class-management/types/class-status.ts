export const CLASS_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type ClassStatus =
  (typeof CLASS_STATUS)[keyof typeof CLASS_STATUS];