import { Router } from "express";
import { studentParentController } from "../../composition/student-parent.container";
import { authenticate } from "../../../../shared/presentation/middlewares/authenticate.middleware";
import { authorize } from "../../../../shared/presentation/middlewares/authorize.middleware";
import { Role } from "../../../auth/domain/enums/role.enum";

const router = Router();

router.get(
  "/children",
  authenticate,
  authorize(Role.PARENT),
  studentParentController.getParentChildren.bind(studentParentController),
);

export default router;