export const BATCH_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type BatchStatus =
  (typeof BATCH_STATUS)[keyof typeof BATCH_STATUS];