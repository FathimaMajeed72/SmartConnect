import { NextFunction, Request, Response } from "express";

import { logger } from "../../infrastructure/logger/winston-logger"

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const startTime = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - startTime;

    logger.info("HTTP request completed", {
      method: req.method,
      path: req.originalUrl.split("?")[0],
      statusCode: res.statusCode,
      durationMs,
    });
  });

  next();
}