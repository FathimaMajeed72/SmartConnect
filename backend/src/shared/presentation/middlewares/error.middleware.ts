import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import { ApplicationError } from "../../errors/application.error";
import { HttpStatusCode } from "../../enums/http-status-code.enum";
import { IErrorStatusMapper } from "../interfaces/error-status-mapper.interface";
import { sendError } from "../helpers/response.helper";

export function errorMiddleware(errorStatusMapper: IErrorStatusMapper) {
  return (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
    if (error instanceof ZodError) {
      sendError(res, HttpStatusCode.BAD_REQUEST, "Validation failed.", error.flatten().fieldErrors);

      return;
    }

    if (error instanceof ApplicationError) {
      console.log("ERROR CLASS:", error.constructor.name);
      console.log("ERROR CODE:", error.code);
      const statusCode = errorStatusMapper.getStatusCode(error.code);
      console.log("MAPPED STATUS:", statusCode);

      if (statusCode) {
        sendError(res, statusCode, error.message);

        return;
      }
    }

    if (error instanceof TokenExpiredError) {
      sendError(res, HttpStatusCode.UNAUTHORIZED, "Access token has expired.");

      return;
    }

    if (error instanceof JsonWebTokenError) {
      sendError(res, HttpStatusCode.UNAUTHORIZED, "Invalid access token.");

      return;
    }

    console.error(error);

    sendError(res, HttpStatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");
  };
}
