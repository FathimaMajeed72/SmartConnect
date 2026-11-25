import { Router } from "express";

import { attendanceController } from "../../composition/attendance.container";

import { authenticate } from "../../../../shared/presentation/middlewares/authenticate.middleware";
import { authorize } from "../../../../shared/presentation/middlewares/authorize.middleware";
import { validateParams } from "../../../../shared/presentation/middlewares/validate-params.middleware";
import { validateQuery } from "../../../../shared/presentation/middlewares/validate-query.middleware";

import { Role } from "../../../auth/domain/enums/role.enum";

import {
  getParentAttendanceParamsSchema,
  getParentAttendanceQuerySchema,
} from "../validators/get-parent-attendance.validator";

const router = Router();

router.get(
  "/:studentId",
  authenticate,
  authorize(Role.PARENT),
  validateParams(getParentAttendanceParamsSchema),
  validateQuery(getParentAttendanceQuerySchema),
  attendanceController.getParentAttendance.bind(attendanceController),
);

export default router;