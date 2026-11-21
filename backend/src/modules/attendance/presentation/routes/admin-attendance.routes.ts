import { Router } from "express";

import { attendanceController } from "../../composition/attendance.container";

import { authenticate } from "../../../../shared/presentation/middlewares/authenticate.middleware";
import { authorize } from "../../../../shared/presentation/middlewares/authorize.middleware";
import { validateQuery } from "../../../../shared/presentation/middlewares/validate-query.middleware";

import { Role } from "../../../auth/domain/enums/role.enum";

import { getSchoolAttendanceSchema } from "../validators/get-school-attendance.validator";
import { ATTENDANCE_ROUTES } from "./attendance.routes.constants";
import { validateParams } from "../../../../shared/presentation/middlewares/validate-params.middleware";
import { getBatchAttendanceParamsSchema, getBatchAttendanceQuerySchema } from "../validators/get-batch-attendance.validator";

const router = Router();

router.get(
  ATTENDANCE_ROUTES.ROOT,
  authenticate,
  authorize(Role.ADMIN),
  validateQuery(getSchoolAttendanceSchema),
  attendanceController.getSchoolAttendance.bind(attendanceController),
);

router.get(
  ATTENDANCE_ROUTES.BATCH_DETAILS,
  authenticate,
  authorize(Role.ADMIN),
  validateParams(getBatchAttendanceParamsSchema),
  validateQuery(getBatchAttendanceQuerySchema),
  attendanceController.getAdminBatchAttendance.bind(attendanceController),
);

export default router;