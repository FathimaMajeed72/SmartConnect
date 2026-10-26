import { Router } from "express";

import { studentController } from "../../composition/student.container";

import { authenticate } from "../../../../shared/presentation/middlewares/authenticate.middleware";
import { authorize } from "../../../../shared/presentation/middlewares/authorize.middleware";
import { validate } from "../../../../shared/presentation/middlewares/validation.middleware";
import { validateQuery } from "../../../../shared/presentation/middlewares/validate-query.middleware";

import { Role } from "../../../auth/domain/enums/role.enum";

import { createStudentSchema } from "../validators/create-student.validator";
import { getStudentsSchema } from "../validators/get-students.validator";
import { updateStudentStatusSchema } from "../validators/update-student-status.validator";

import { STUDENT_ROUTES } from "./student.routes.constants";

const router = Router();

router.get(
  STUDENT_ROUTES.ROOT,
  authenticate,
  authorize(Role.ADMIN),
  validateQuery(getStudentsSchema),
  studentController.getStudents.bind(studentController),
);

router.post(
  STUDENT_ROUTES.ROOT,
  authenticate,
  authorize(Role.ADMIN),
  validate(createStudentSchema),
  studentController.createStudent.bind(studentController),
);

router.get(
  `${STUDENT_ROUTES.ROOT}:id`,
  authenticate,
  authorize(Role.ADMIN),
  studentController.getStudent.bind(studentController),
);

router.patch(
  `${STUDENT_ROUTES.ROOT}:id/status`,
  authenticate,
  authorize(Role.ADMIN),
  validate(updateStudentStatusSchema),
  studentController.updateStudentStatus.bind(studentController),
);

export default router;