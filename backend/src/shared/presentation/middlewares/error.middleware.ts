import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import { ApplicationError } from "../../errors/application.error";
import { HttpStatusCode } from "../../enums/http-status-code.enum";
import { IErrorStatusMapper } from "../interfaces/error-status-mapper.interface";

export function errorMiddleware(
  errorStatusMapper: IErrorStatusMapper,
) {
  return (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): void => {
    if (error instanceof ZodError) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Validation failed.",
        errors: error.flatten().fieldErrors,
      });

      return;
    }

    if (error instanceof ApplicationError) {
      const statusCode = errorStatusMapper.getStatusCode(error.code);

      if (statusCode) {
        res.status(statusCode).json({
          success: false,
          message: error.message,
        });

        return;
      }
    }

    if (error instanceof TokenExpiredError) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Access token has expired.",
      });

      return;
    }

    if (error instanceof JsonWebTokenError) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid access token.",
      });

      return;
    }

    console.error(error);

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  };
}