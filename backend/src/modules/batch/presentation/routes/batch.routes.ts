import { Router } from "express";

import { batchController } from "../../composition/batch.container"; 

import { authenticate } from "../../../../shared/presentation/middlewares/authenticate.middleware";
import { authorize } from "../../../../shared/presentation/middlewares/authorize.middleware";
import { validate } from "../../../../shared/presentation/middlewares/validation.middleware";

import { Role } from "../../../auth/domain/enums/role.enum";

import { createBatchSchema } from "../validators/create-batch.validator";
import { BATCH_ROUTES } from "./batch.routes.constants";
import { updateBatchSchema } from "../validators/update-batch.validator";
import { updateBatchStatusSchema } from "../validators/update-batch-status.validator";

const router = Router();

router.get(
  BATCH_ROUTES.AVAILABLE_CLASS_TEACHERS,
  authenticate,
  authorize(Role.ADMIN),
  batchController.getAvailableClassTeachers.bind(batchController),
);

router.post(
  BATCH_ROUTES.BY_CLASS,
  authenticate,
  authorize(Role.ADMIN),
  validate(createBatchSchema),
  batchController.createBatch.bind(batchController),
);

router.get(
  BATCH_ROUTES.BY_CLASS,
  authenticate,
  authorize(Role.ADMIN),
  batchController.getBatches.bind(batchController),
);

router.get(
  BATCH_ROUTES.BY_ID,
  authenticate,
  authorize(Role.ADMIN),
  batchController.getBatch.bind(batchController),
);

router.patch(
  BATCH_ROUTES.BY_ID,
  authenticate,
  authorize(Role.ADMIN),
  validate(updateBatchSchema),
  batchController.updateBatch.bind(batchController),
);

router.patch(
  `${BATCH_ROUTES.BY_ID}/status`,
  authenticate,
  authorize(Role.ADMIN),
  validate(updateBatchStatusSchema),
  batchController.updateBatchStatus.bind(batchController),
);

export default router;