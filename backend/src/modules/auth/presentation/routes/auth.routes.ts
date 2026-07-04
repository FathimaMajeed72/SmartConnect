import { Router } from "express";

import { authController } from "../../composition/auth.container";

import { validate } from "../../../../shared/presentation/middlewares/validation.middleware";

import { inviteUserSchema } from "../validators/invite-user.validator";

const router = Router();

router.post(
  "/invite",
  validate(inviteUserSchema),
  authController.inviteUser.bind(authController)
);

export default router;