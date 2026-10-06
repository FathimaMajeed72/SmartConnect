import { Router } from "express";

import authRoutes from "../../modules/auth/presentation/routes/auth.routes";
import adminRoutes from "../../modules/admin/presentation/routes/admin.routes";
import classRoutes from "../../modules/class/presentation/routes/class.routes";
import subjectRoutes from "../../modules/subject/presentation/routes/subject.routes"
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
router.use("/admin/classes", classRoutes);
router.use("/admin/subjects", subjectRoutes);

export default router;