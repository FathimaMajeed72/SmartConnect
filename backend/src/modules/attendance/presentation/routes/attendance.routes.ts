import { Router } from "express";

import { attendanceController } from "../../composition/attendance.container";

import { authenticate } from "../../../../shared/presentation/middlewares/authenticate.middleware";
import { authorize } from "../../../../shared/presentation/middlewares/authorize.middleware";
import { validate } from "../../../../shared/presentation/middlewares/validation.middleware";

import { Role } from "../../../auth/domain/enums/role.enum";

import { markAttendanceSchema } from "../validators/mark-attendance.validator";

import { ATTENDANCE_ROUTES } from "./attendance.routes.constants";
import { validateParams } from "../../../../shared/presentation/middlewares/validate-params.middleware";
import { validateQuery } from "../../../../shared/presentation/middlewares/validate-query.middleware";
import {
  getBatchAttendanceParamsSchema,
  getBatchAttendanceQuerySchema,
} from "../validators/get-batch-attendance.validator";
import {
  updateAttendanceParamsSchema,
  updateAttendanceSchema,
} from "../validators/update-attendance.validator";

const router = Router();

router.get(
  "/my-batch",
  authenticate,
  authorize(Role.TEACHER),
  attendanceController.getMyBatch.bind(attendanceController),
);

router.post(
  ATTENDANCE_ROUTES.ROOT,
  authenticate,
  authorize(Role.TEACHER),
  validate(markAttendanceSchema),
  attendanceController.markAttendance.bind(attendanceController),
);

router.get(
  `${ATTENDANCE_ROUTES.ROOT}:batchId`,
  authenticate,
  authorize(Role.TEACHER),
  validateParams(getBatchAttendanceParamsSchema),
  validateQuery(getBatchAttendanceQuerySchema),
  attendanceController.getBatchAttendance.bind(attendanceController),
);

router.patch(
  `${ATTENDANCE_ROUTES.ROOT}:batchId`,
  authenticate,
  authorize(Role.TEACHER),
  validateParams(updateAttendanceParamsSchema),
  validate(updateAttendanceSchema),
  attendanceController.updateAttendance.bind(attendanceController),
);

export default router;
