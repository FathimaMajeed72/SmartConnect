import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import routes from "./routes";

import { errorMiddleware } from "../shared/presentation/middlewares/error.middleware";
import { env } from "../config/env";
import { AuthErrorStatusMapper } from "../modules/auth/presentation/mappers/auth-error-status.mapper";
import { AdminErrorStatusMapper } from "../modules/admin/presentation/mappers/admin-error-status.mapper";
import { CompositeErrorStatusMapper } from "../shared/presentation/mappers/composite-error-status.mapper";
import { CommonErrorStatusMapper } from "../shared/presentation/mappers/common-error-status.mapper";

const app = express();

const authErrorStatusMapper = new AuthErrorStatusMapper();
const adminErrorStatusMapper = new AdminErrorStatusMapper();
const commonErrorStatusMapper = new CommonErrorStatusMapper();

const errorStatusMapper = new CompositeErrorStatusMapper([
  authErrorStatusMapper,
  adminErrorStatusMapper,
  commonErrorStatusMapper,
]);

app.use(helmet());

app.use(
  cors({
    origin: env.frontend.url,
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(compression());

app.use("/api", routes);

app.use(errorMiddleware(errorStatusMapper));

export default app;
