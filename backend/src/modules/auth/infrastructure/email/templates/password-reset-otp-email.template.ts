import { EmailTemplate } from "../types/email-template.type";

export function buildPasswordResetOtpEmail(
  firstName: string,
  otp: string
): EmailTemplate {
  return {
    subject: "Reset your SmartConnect password",

    text: `
    Hello ${firstName},

    We received a request to reset your SmartConnect password.

    Your verification code is:

    ${otp}

    This code expires in 10 minutes.

    If you didn't request a password reset, you can safely ignore this email.
    `,

    html: `
    <h2>Password Reset Request</h2>

    <p>Hello <strong>${firstName}</strong>,</p>

    <p>Use the following OTP to reset your password:</p>

    <h1>${otp}</h1>

    <p>This OTP is valid for 10 minutes.</p>

    <p>
    If you didn't request a password reset, you can safely ignore this email.
    </p>
    `,
  };
}