import { EmailTemplate } from "../types/email-template.type";

export function buildPasswordResetEmail(
  firstName: string,
  resetLink: string
): EmailTemplate {
  return {
    subject: "Reset your SmartConnect password",

    text: `
    Hello ${firstName},

    We received a request to reset your SmartConnect password.

    You can reset your password using the link below:

    ${resetLink}

    If you didn't request a password reset, you can safely ignore this email.
    `,

    html: `
    <h2>Password Reset Request</h2>

    <p>Hello <strong>${firstName}</strong>,</p>

    <p>We received a request to reset your SmartConnect password.</p>

    <p>
    Click the link below to reset your password:
    </p>

    <p>
    <a href="${resetLink}">
        Reset Password
    </a>
    </p>

    <p>
    If you didn't request a password reset, you can safely ignore this email.
    </p>
    `,
  };
}