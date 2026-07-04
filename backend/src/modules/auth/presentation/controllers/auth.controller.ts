import { Request, Response, NextFunction } from "express";

import { InviteUserUseCase } from "../../application/use-cases/invite-user.use-case";

export class AuthController {
  constructor(private readonly inviteUserUseCase: InviteUserUseCase) {}

  async inviteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.inviteUserUseCase.execute(req.body);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
