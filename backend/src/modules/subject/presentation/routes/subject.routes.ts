import { Router } from "express";

import { subjectController } from "../../composition/subject.container";

import { authenticate } from "../../../../shared/presentation/middlewares/authenticate.middleware";
import { authorize } from "../../../../shared/presentation/middlewares/authorize.middleware";
import { validate } from "../../../../shared/presentation/middlewares/validation.middleware";
import { validateQuery } from "../../../../shared/presentation/middlewares/validate-query.middleware";

import { Role } from "../../../auth/domain/enums/role.enum";

import { createSubjectSchema } from "../validators/create-subject.schema"; 
import { getSubjectsSchema } from "../validators/get-subject.schema";
import { updateSubjectSchema } from "../validators/update-subject.schema";
import { updateSubjectStatusSchema } from "../validators/update-subject-status.schema";

import { SUBJECT_ROUTES } from "./subject.routes.constants";

const router = Router();

router.get(
  SUBJECT_ROUTES.ROOT,
  authenticate,
  authorize(Role.ADMIN),
  validateQuery(getSubjectsSchema),
  subjectController.getSubjects.bind(subjectController),
);

router.post(
  SUBJECT_ROUTES.ROOT,
  authenticate,
  authorize(Role.ADMIN),
  validate(createSubjectSchema),
  subjectController.createSubject.bind(subjectController),
);

router.get(
  `${SUBJECT_ROUTES.ROOT}:id`,
  authenticate,
  authorize(Role.ADMIN),
  subjectController.getSubject.bind(subjectController),
);

router.patch(
  `${SUBJECT_ROUTES.ROOT}:id`,
  authenticate,
  authorize(Role.ADMIN),
  validate(updateSubjectSchema),
  subjectController.updateSubject.bind(subjectController),
);

router.patch(
  `${SUBJECT_ROUTES.ROOT}:id/status`,
  authenticate,
  authorize(Role.ADMIN),
  validate(updateSubjectStatusSchema),
  subjectController.updateSubjectStatus.bind(
    subjectController,
  ),
);

export default router;