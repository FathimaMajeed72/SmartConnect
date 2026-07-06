import { z } from "zod";

export const activateAccountSchema = z.object({
    token: z.string().min(1, "Token is required."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(100)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character."
      ),
});


