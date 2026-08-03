import { z } from "zod";

export const verifyResetOtpSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .trim(),

  otp: z
    .string()
    .trim()
    .length(6, "OTP must be 6 digits."),
});