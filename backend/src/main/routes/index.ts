import { Router } from "express";

import authRoutes from "../../modules/auth/presentation/routes/auth.routes";
import adminRoutes from "../../modules/admin/presentation/routes/admin.routes";
import { HttpStatusCode } from "../../shared/enums/http-status-code.enum";

const router = Router();

router.get("/", (_req, res) => {
  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "SmartConnect API is running",
  });
});

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;