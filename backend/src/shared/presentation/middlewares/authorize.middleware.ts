import { NextFunction, Response } from "express";

import { Role } from "../../../modules/auth/domain/enums/role.enum";
import { AuthenticatedRequest } from "./authenticate.middleware";

export function authorize(...allowedRoles: Role[]) {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required.",
      });

      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource.",
      });

      return;
    }

    next();
  };
}