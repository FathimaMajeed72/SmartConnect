import dotenv from "dotenv";
import { z } from "zod";

import type { SignOptions } from "jsonwebtoken";

dotenv.config();


const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  PORT: z.coerce.number().positive().default(5000),

  MONGODB_URI: z.string().min(1),

  BCRYPT_SALT_ROUNDS: z.coerce.number().default(12),

  JWT_ACCESS_SECRET: z.string().min(32),

  JWT_REFRESH_SECRET: z.string().min(32),

  JWT_ACCESS_EXPIRES_IN: z.string().regex(/^\d+(ms|s|m|h|d|w|y)$/),

  JWT_REFRESH_EXPIRES_IN: z.string().regex(/^\d+(ms|s|m|h|d|w|y)$/),

  ACTIVATION_TOKEN_EXPIRES_IN_HOURS: z.coerce.number().positive().default(24),

  REFRESH_TOKEN_EXPIRES_IN_DAYS: z.coerce.number().positive().default(7 ),

  EMAIL_HOST: z.string().min(1),

  EMAIL_PORT: z.coerce.number().positive(),

  EMAIL_USER: z.email(),

  EMAIL_PASSWORD: z.string().min(1),

  EMAIL_FROM: z.string().min(1),

  FRONTEND_URL: z.url(),
  
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables");
  console.error(parsed.error.format());

  process.exit(1);
}

export const env = {
  nodeEnv: parsed.data.NODE_ENV,

  port: parsed.data.PORT,

  database: {
    mongoUri: parsed.data.MONGODB_URI,
  },

  bcryptSaltRounds: parsed.data.BCRYPT_SALT_ROUNDS,

  jwt: {
    accessSecret: parsed.data.JWT_ACCESS_SECRET,

    refreshSecret: parsed.data.JWT_REFRESH_SECRET,

    accessExpiresIn: parsed.data.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],

    refreshExpiresIn: parsed.data.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
  },

  activationTokenExpiresInHours:
  parsed.data.ACTIVATION_TOKEN_EXPIRES_IN_HOURS,

  refreshTokenExpiresInDays: 
  parsed.data.REFRESH_TOKEN_EXPIRES_IN_DAYS,

  email: {
    host: parsed.data.EMAIL_HOST,
    port: parsed.data.EMAIL_PORT,
    user: parsed.data.EMAIL_USER,
    password: parsed.data.EMAIL_PASSWORD,
    from: parsed.data.EMAIL_FROM,
  },

  frontend: {
    url: parsed.data.FRONTEND_URL,
  },

};