export const SUBJECT_STATUS = {
  ACTIVE : "ACTIVE",
  INACTIVE : "INACTIVE",
} as const;

export type SubjectStatus =
  (typeof SUBJECT_STATUS)[keyof typeof SUBJECT_STATUS];