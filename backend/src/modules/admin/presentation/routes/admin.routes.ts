import { Router } from "express";
import { adminController } from "../../composition/admin.container";
import { authorize } from "../../../../shared/presentation/middlewares/authorize.middleware";
import { Role } from "../../../auth/domain/enums/role.enum";
import { authenticate } from "../../../../shared/presentation/middlewares/authenticate.middleware";
import { validateQuery } from "../../../../shared/presentation/middlewares/validate-query.middleware";
import { getParentsSchema } from "../validators/get-parents.validator";
import { validate } from "../../../../shared/presentation/middlewares/validation.middleware";
import { addParentSchema } from "../validators/add-parent.validator";
import { getTeachersSchema } from "../validators/get-teachers.validator";
import { addTeacherSchema } from "../validators/add-teacher.validator";

import { ADMIN_ROUTES } from "./admin.routes.constants";
import { updateTeacherSchema } from "../validators/update-teacher.validator";
import { updateTeacherStatusSchema } from "../validators/update-teacher-status.validator";

const router = Router();

router.get(
  ADMIN_ROUTES.PARENTS,
  authenticate,
  authorize(Role.ADMIN),
  validateQuery(getParentsSchema),
  adminController.getParents.bind(adminController),
);

router.post(
  ADMIN_ROUTES.PARENTS,
  authenticate,
  authorize(Role.ADMIN),
  validate(addParentSchema),
  adminController.addParent.bind(adminController),
);

router.get(
  ADMIN_ROUTES.TEACHERS,
  authenticate,
  authorize(Role.ADMIN),
  validateQuery(getTeachersSchema),
  adminController.getTeachers.bind(adminController),
);

router.post(
  ADMIN_ROUTES.TEACHERS,
  authenticate,
  authorize(Role.ADMIN),
  validate(addTeacherSchema),
  adminController.addTeacher.bind(adminController),
);

router.get(
  `${ADMIN_ROUTES.TEACHERS}/:id`,
  authenticate,
  authorize(Role.ADMIN),
  adminController.getTeacher.bind(adminController),
);

router.patch(
  `${ADMIN_ROUTES.TEACHERS}/:id`,
  authenticate,
  authorize(Role.ADMIN),
  validate(updateTeacherSchema),
  adminController.updateTeacher.bind(adminController),
);

router.patch(
  `${ADMIN_ROUTES.TEACHERS}/:id/status`,
  authenticate,
  authorize(Role.ADMIN),
  validate(updateTeacherStatusSchema),
  adminController.updateTeacherStatus.bind(adminController),
);

router.post(
  `${ADMIN_ROUTES.TEACHERS}/:id/resend-invitation`,
  authenticate,
  authorize(Role.ADMIN),
  adminController.resendTeacherInvitation.bind(adminController),
);

export default router;
