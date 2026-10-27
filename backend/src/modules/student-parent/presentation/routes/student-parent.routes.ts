import { Router } from "express";

import { studentParentController } from "../../composition/student-parent.container"; 

import { authenticate } from "../../../../shared/presentation/middlewares/authenticate.middleware";
import { authorize } from "../../../../shared/presentation/middlewares/authorize.middleware";
import { validate } from "../../../../shared/presentation/middlewares/validation.middleware";

import { Role } from "../../../auth/domain/enums/role.enum";

import { assignParentToStudentSchema } from "../validators/assign-parent-to-student.validator";

import { STUDENT_PARENT_ROUTES } from "./student-parent.routes.constants"; 
import { updateStudentParentStatusSchema } from "../validators/update-student-parent-status.validator";
import { updateStudentParentSchema } from "../validators/update-student-parent.validator";

const router = Router();

router.post(
  STUDENT_PARENT_ROUTES.BY_STUDENT,
  authenticate,
  authorize(Role.ADMIN),
  validate(assignParentToStudentSchema),
  studentParentController.assignParentToStudent.bind(studentParentController),
);

router.get(
  STUDENT_PARENT_ROUTES.BY_STUDENT,
  authenticate,
  authorize(Role.ADMIN),
  studentParentController.getStudentParents.bind(studentParentController),
);

router.patch(
  STUDENT_PARENT_ROUTES.STATUS,
  authenticate,
  authorize(Role.ADMIN),
  validate(updateStudentParentStatusSchema),
  studentParentController.updateStudentParentStatus.bind(
    studentParentController,
  ),
);

router.patch(
  STUDENT_PARENT_ROUTES.UPDATE,
  authenticate,
  authorize(Role.ADMIN),
  validate(updateStudentParentSchema),
  studentParentController.updateStudentParent.bind(
    studentParentController,
  ),
);

export default router;