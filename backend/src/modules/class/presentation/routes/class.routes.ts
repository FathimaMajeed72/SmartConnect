import { Router } from "express";

import { classController } from "../../composition/class.container";

import { authenticate } from "../../../../shared/presentation/middlewares/authenticate.middleware";
import { authorize } from "../../../../shared/presentation/middlewares/authorize.middleware";
import { validate } from "../../../../shared/presentation/middlewares/validation.middleware";
import { validateQuery } from "../../../../shared/presentation/middlewares/validate-query.middleware";

import { Role } from "../../../auth/domain/enums/role.enum";

import { createClassSchema } from "../validators/create-class.validator";
import { getClassesSchema } from "../validators/get-classes.validator";
import { updateClassSchema } from "../validators/update-class.validator";
import { updateClassStatusSchema } from "../validators/update-class-status.validator";

import { CLASS_ROUTES } from "./class.routes.constants";

const router = Router();

router.get(
  CLASS_ROUTES.ROOT,
  authenticate,
  authorize(Role.ADMIN),
  validateQuery(getClassesSchema),
  classController.getClasses.bind(classController),
);

router.post(
  CLASS_ROUTES.ROOT,
  authenticate,
  authorize(Role.ADMIN),
  validate(createClassSchema),
  classController.createClass.bind(classController),
);

router.get(
  `${CLASS_ROUTES.ROOT}:id`,
  authenticate,
  authorize(Role.ADMIN),
  classController.getClass.bind(classController),
);

router.patch(
  `${CLASS_ROUTES.ROOT}:id`,
  authenticate,
  authorize(Role.ADMIN),
  validate(updateClassSchema),
  classController.updateClass.bind(classController),
);

router.patch(
  `${CLASS_ROUTES.ROOT}:id/status`,
  authenticate,
  authorize(Role.ADMIN),
  validate(updateClassStatusSchema),
  classController.updateClassStatus.bind(classController),
);

export default router;