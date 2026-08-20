import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export interface ValidatedQueryRequest extends Request {
  validatedQuery?: unknown;
}

export function validateQuery(schema: ZodSchema) {
  return (
    req: ValidatedQueryRequest,
    _res: Response,
    next: NextFunction,
  ): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.validatedQuery = result.data;

    next();
  };
}