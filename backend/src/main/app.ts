import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import routes from "./routes";

import { errorMiddleware } from "../shared/presentation/middlewares/error.middleware";
import { env } from "../config/env";
import { AuthErrorStatusMapper } from "../modules/auth/presentation/mappers/auth-error-status.mapper";

const app = express();

const authErrorStatusMapper = new AuthErrorStatusMapper();

app.use(helmet());

app.use(cors({
    origin: env.frontend.url,
    credentials: true,
  }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(compression());

app.use("/api", routes);

app.use(errorMiddleware(authErrorStatusMapper));

export default app;