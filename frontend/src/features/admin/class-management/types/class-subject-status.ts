export const CLASS_SUBJECT_STATUS = {
  ACTIVE : "ACTIVE",
  INACTIVE : "INACTIVE",
} as const;

export type ClassSubjectStatus =
  (typeof CLASS_SUBJECT_STATUS)[keyof typeof CLASS_SUBJECT_STATUS];