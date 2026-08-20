import { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";

import { EmailAlreadyExistsError } from "../../../modules/auth/application/errors/email-already-exists.error";
import { InvalidActivationTokenError } from "../../../modules/auth/application/errors/invalid-activation-token.error";
import { ActivationTokenExpiredError } from "../../../modules/auth/application/errors/activation-token-expired.error";
import { InvalidCredentialsError } from "../../../modules/auth/application/errors/invalid-credentials.error";
import { UserNotActiveError } from "../../../modules/auth/application/errors/user-not-active.error";
import { InvalidRefreshTokenError } from "../../../modules/auth/application/errors/invalid-refresh-token.error";
import { RefreshTokenExpiredError } from "../../../modules/auth/application/errors/refresh-token-expired.error";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      errors: error.flatten().fieldErrors,
    });
    return;
  }

  if (error instanceof EmailAlreadyExistsError) {
    res.status(409).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof InvalidActivationTokenError) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof ActivationTokenExpiredError) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof InvalidCredentialsError) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof UserNotActiveError) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof InvalidRefreshTokenError) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof RefreshTokenExpiredError) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (error instanceof TokenExpiredError) {
  res.status(401).json({
    success: false,
    message: "Access token has expired.",
  });

  return;
}

if (error instanceof JsonWebTokenError) {
  res.status(401).json({
    success: false,
    message: "Invalid access token.",
  });

  return;
}
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
