import type { Response } from "express";

import { HttpStatusCode } from "../../enums/http-status-code.enum";
import type { ApiSuccessResponse, ApiErrorResponse } from "../models/api-response.model";

export function sendSuccess<T>(
  res: Response,
  statusCode: HttpStatusCode,
  message: string,
  data?: T,
): void {
  const response: ApiSuccessResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
  };

  res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  statusCode: HttpStatusCode,
  message: string,
  errors?: Record<string, string[]>,
): void {
  const response: ApiErrorResponse = {
    success: false,
    message,
    ...(errors !== undefined && { errors }),
  };

  res.status(statusCode).json(response);
}
