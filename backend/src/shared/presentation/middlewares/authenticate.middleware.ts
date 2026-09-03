import { NextFunction, Request, Response } from "express";

import { JwtTokenService } from "../../../modules/auth/infrastructure/security/jwt-token.service.impl";
import { Role } from "../../../modules/auth/domain/enums/role.enum";
import { HttpStatusCode } from "../../enums/http-status-code.enum";

const tokenService = new JwtTokenService();

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: Role;
  };
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required.",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    const payload = await tokenService.verifyAccessToken(token);

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}