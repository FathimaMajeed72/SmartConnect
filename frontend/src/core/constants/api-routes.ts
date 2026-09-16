export const API_ROUTES = {
  AUTH: {
    BASE: "/auth",
    LOGIN: "/auth/login",
    REFRESH_TOKEN: "/auth/refresh-token",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_RESET_OTP: "/auth/verify-reset-otp",
    RESEND_OTP: "/auth/resend-otp",
    RESET_PASSWORD: "/auth/reset-password",
    ACTIVATE: "/auth/activate",
  },

  ADMIN: {
    PARENTS: "/admin/parents",
    TEACHERS: "/admin/teachers",
  },
} as const;