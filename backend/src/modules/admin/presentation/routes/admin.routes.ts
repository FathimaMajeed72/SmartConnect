import { Router } from "express";
import { adminController } from "../../composition/admin.container";
import { authorize } from "../../../../shared/presentation/middlewares/authorize.middleware";
import { Role } from "../../../auth/domain/enums/role.enum";
import { authenticate } from "../../../../shared/presentation/middlewares/authenticate.middleware";
import { validateQuery } from "../../../../shared/presentation/middlewares/validate-query.middleware";
import { getParentsSchema } from "../validators/get-parents.validator";
import { validate } from "../../../../shared/presentation/middlewares/validation.middleware";
import { addParentSchema } from "../validators/add-parent.validator";



const router = Router();

router.get(
  "/parents",
  authenticate,
  authorize(Role.ADMIN),
  validateQuery(getParentsSchema),
  adminController.getParents.bind(adminController),
);

router.post(
  "/parents",
  authenticate,
  authorize(Role.ADMIN),
  validate(addParentSchema),
  adminController.addParent.bind(adminController),
);

export default router;