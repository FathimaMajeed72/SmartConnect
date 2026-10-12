import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import { ApplicationError } from "../../errors/application.error";
import { HttpStatusCode } from "../../enums/http-status-code.enum";
import { IErrorStatusMapper } from "../interfaces/error-status-mapper.interface";
import { sendError } from "../helpers/response.helper";
import { logger } from "../../infrastructure/logger/winston-logger";

export function errorMiddleware(errorStatusMapper: IErrorStatusMapper) {
  return (error: Error, req: Request, res: Response, _next: NextFunction): void => {
    if (error instanceof ZodError) {
      logger.warn("Request validation failed", {
        method: req.method,
        path: req.path,
        errorName: error.name,
        fieldErrors: error.flatten().fieldErrors,
      });

      sendError(res, HttpStatusCode.BAD_REQUEST, "Validation failed.", error.flatten().fieldErrors);

      return;
    }

    if (error instanceof ApplicationError) {
      const statusCode = errorStatusMapper.getStatusCode(error.code);

      if (statusCode) {
        const log = statusCode >= 500 ? logger.error : logger.warn;

        log("Application error occurred", {
          method: req.method,
          path: req.path,
          errorName: error.constructor.name,
          errorCode: error.code,
          statusCode,
        });
        sendError(res, statusCode, error.message);

        return;
      }

      logger.error("Application error has no mapped status code", {
        method: req.method,
        path: req.path,
        errorName: error.constructor.name,
        errorCode: error.code,
      });
    }

    if (error instanceof TokenExpiredError) {
      logger.warn("Access token expired", {
        method: req.method,
        path: req.path,
      });

      sendError(res, HttpStatusCode.UNAUTHORIZED, "Access token has expired.");

      return;
    }

    if (error instanceof JsonWebTokenError) {
      logger.warn("Invalid access token", {
        method: req.method,
        path: req.path,
      });

      sendError(res, HttpStatusCode.UNAUTHORIZED, "Invalid access token.");

      return;
    }

    logger.error("Unhandled application error", {
      method: req.method,
      path: req.path,
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
    });

    sendError(res, HttpStatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
  };
}
