import { Router } from "express";
import { adminController } from "../../composition/admin.container";



const router = Router();

router.get(
  "/parents",
  adminController.getParents.bind(adminController),
);

export default router;