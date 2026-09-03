import { NextFunction, Response } from "express";

import { Role } from "../../../modules/auth/domain/enums/role.enum";
import { AuthenticatedRequest } from "./authenticate.middleware";
import { HttpStatusCode } from "../../enums/http-status-code.enum";

export function authorize(...allowedRoles: Role[]) {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required.",
      });

      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(HttpStatusCode.FORBIDDEN).json({
        success: false,
        message: "You do not have permission to access this resource.",
      });

      return;
    }

    next();
  };
}