import { Router } from "express";

import { authController } from "../../composition/auth.container";

import { validate } from "../../../../shared/presentation/middlewares/validation.middleware";

import { inviteUserSchema } from "../validators/invite-user.validator";
import { activateAccountSchema } from "../validators/activate-account.validator";
import { loginSchema } from "../validators/login.validator";
import { refreshTokenSchema } from "../validators/refresh-token.validator";

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
  validate(refreshTokenSchema),
  authController.refreshToken.bind(authController),
);

export default router;