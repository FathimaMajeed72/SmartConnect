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

import { AUTH_ROUTES } from "./auth.routes.constants";

const router = Router();

router.post(
  AUTH_ROUTES.INVITE,
  validate(inviteUserSchema),
  authController.inviteUser.bind(authController)
);

router.post(
  AUTH_ROUTES.ACTIVATE,
  validate(activateAccountSchema),
  authController.activateAccount.bind(authController),
);

router.post(
  AUTH_ROUTES.LOGIN,
  validate(loginSchema),
  authController.login.bind(authController)
);

router.post(
  AUTH_ROUTES.REFRESH_TOKEN,
  authController.refreshToken.bind(authController),
);

router.post(
  AUTH_ROUTES.LOGOUT,
  authController.logout.bind(authController),
);

router.post(
  AUTH_ROUTES.FORGOT_PASSWORD,
  validate(forgotPasswordSchema),
  authController.forgotPassword.bind(authController),
);

router.post(
    AUTH_ROUTES.VERIFY_RESET_OTP,
    validate(verifyResetOtpSchema),
    authController.verifyResetOtp.bind(authController),
);

router.post(
  AUTH_ROUTES.RESET_PASSWORD,
  validate(resetPasswordSchema),
  authController.resetPassword.bind(authController),
);

router.post(
  AUTH_ROUTES.RESEND_OTP,
  validate(resendOtpSchema),
  authController.resendOtp.bind(authController),
);

export default router;