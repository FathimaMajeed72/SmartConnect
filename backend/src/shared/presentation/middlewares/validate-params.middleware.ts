import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export interface ValidatedParamsRequest extends Request {
  validatedParams?: unknown;
}

export function validateParams(schema: ZodSchema) {
  return (
    req: ValidatedParamsRequest,
    _res: Response,
    next: NextFunction,
  ): void => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.validatedParams = result.data;

    next();
  };
}