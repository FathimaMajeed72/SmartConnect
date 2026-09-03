import { env } from "../../../../config/env";

import { IAuthEmailService } from "../../application/interfaces/auth-email.service.interface";

import { mailer } from "./mailer";

import { buildActivationEmail } from "./templates/activation-email.template"; 
import { buildPasswordResetOtpEmail } from "./templates/password-reset-otp-email.template";


export class NodemailerEmailService implements IAuthEmailService {

    async sendActivationEmail(
        firstName: string,
        email: string,
        token: string
    ): Promise<void> {

        const activationLink =
            `${env.frontend.url}/auth/activate?token=${token}`;

        const template =
            buildActivationEmail(firstName, activationLink);

        await mailer.sendMail({
            from: env.email.from,

            to: email,

            subject: template.subject,

            text: template.text,

            html: template.html,
        });

    }

    async sendPasswordResetOtpEmail(
        firstName: string,
        email: string,
        otp: string
        ): Promise<void> {

        const template =
            buildPasswordResetOtpEmail(firstName, otp);

        await mailer.sendMail({
            from: env.email.from,

            to: email,

            subject: template.subject,

            text: template.text,

            html: template.html,
        });

    }
}