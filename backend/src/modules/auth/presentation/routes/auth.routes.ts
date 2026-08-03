import { Router } from "express";

import { authController } from "../../composition/auth.container";

import { validate } from "../../../../shared/presentation/middlewares/validation.middleware";

import { inviteUserSchema } from "../validators/invite-user.validator";
import { activateAccountSchema } from "../validators/activate-account.validator";
import { loginSchema } from "../validators/login.validator";
import { forgotPasswordSchema } from "../validators/forgot-password.validator";
import { resetPasswordSchema } from "../validators/reset-password.validator";
import { verifyResetOtpSchema } from "../validators/verify-reset-otp.validator";
import { resendOtpSchema } from "../validators/resend-otp.validator";


const router = Router();

router.post(
  "/invite",
  validate(inviteUserSchema),
  authController.inviteUser.bind(authController)
);

router.post(
  "/activate",
  validate(activateAccountSchema),
  authController.activateAccount.bind(authController),
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login.bind(authController)
);

router.post(
  "/refresh-token",
  authController.refreshToken.bind(authController),
);

router.post(
  "/logout",
  authController.logout.bind(authController),
);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPassword.bind(authController),
);

router.post(
    "/verify-reset-otp",
    validate(verifyResetOtpSchema),
    authController.verifyResetOtp.bind(authController),
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword.bind(authController),
);

router.post(
  "/resend-otp",
  validate(resendOtpSchema),
  authController.resendOtp.bind(authController),
);

export default router;