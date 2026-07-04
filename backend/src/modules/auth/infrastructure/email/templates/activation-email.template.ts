import { EmailTemplate } from "../types/email-template.type";

export function buildActivationEmail(
  firstName: string,
  activationLink: string
): EmailTemplate {
  return {
    subject: "Activate your SmartConnect account",

    text:  `
    Hello ${firstName},

    Welcome to SmartConnect!

    Please activate your account using the link below:

    ${activationLink}

    If you did not expect this email, you can ignore it.
    `,

    html: `
    <h2>Welcome to SmartConnect!</h2>

    <p>Hello <strong>${firstName}</strong>,</p>

    <p>
    Your account has been created successfully.
    </p>

    <p>
    Click the link below to activate your account:
    </p>

    <p>
    <a href="${activationLink}">
    Activate Account
    </a>
    </p>

    <p>
    If you did not expect this email, you can safely ignore it.
    </p>
    `,
  };
}