import nodemailer from "nodemailer";

import { env } from "../../../../config/env";

export const mailer = nodemailer.createTransport({
  host: env.email.host,

  port: env.email.port,

  secure: false,

  auth: {
    user: env.email.user,
    pass: env.email.password,
  },
});