export const USER_STATUS = {
  INVITED: "INVITED",
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  INACTIVE: "INACTIVE",
} as const;

export type UserStatus =
  (typeof USER_STATUS)[keyof typeof USER_STATUS];