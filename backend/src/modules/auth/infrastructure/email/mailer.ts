import nodemailer from "nodemailer";

import { env } from "../../../../config/env";

export const mailer = nodemailer.createTransport({
  host: env.email.host,

  port: env.email.port,

  secure: false,

  pool: true,
  maxConnections: 5,
  maxMessages: 100,

  auth: {
    user: env.email.user,
    pass: env.email.password,
  },
});
