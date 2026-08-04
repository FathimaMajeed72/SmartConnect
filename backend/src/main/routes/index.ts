import { Router } from "express";

import authRoutes from "../../modules/auth/presentation/routes/auth.routes";
import adminRoutes from "../../modules/admin/presentation/routes/admin.routes";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "SmartConnect API is running",
  });
});

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;