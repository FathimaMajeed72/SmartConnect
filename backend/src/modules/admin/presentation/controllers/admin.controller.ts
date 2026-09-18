import type { Request, Response, NextFunction } from "express";

import { ValidatedQueryRequest } from "../../../../shared/presentation/middlewares/validate-query.middleware";
import { UserStatus } from "../../../auth/domain/enums/user-status.enum";
import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { IGetParentsUseCase } from "../../application/use-case-interfaces/get-parents.use-case.interface";
import { IAddParentUseCase } from "../../application/use-case-interfaces/add-parent.use-case.interface";
import { IGetTeachersUseCase } from "../../application/use-case-interfaces/get-teachers.use-case.interface";
import { IAddTeacherUseCase } from "../../application/use-case-interfaces/add-teacher.use-case.interface";
import { IGetTeacherUseCase } from "../../application/use-case-interfaces/get-teacher.use-case.interface";
import { IUpdateTeacherUseCase } from "../../application/use-case-interfaces/update-teacher.use-case.interface";
import { sendError, sendSuccess } from "../../../../shared/presentation/helpers/response.helper";
import { Types } from "mongoose";
import { IUpdateTeacherStatusUseCase } from "../../application/use-case-interfaces/update-teacher-status.use-case.interface";
import { IResendTeacherInvitationUseCase } from "../../application/use-case-interfaces/resend-teacher-invitation.use-case.interface";

export class AdminController {
  constructor(
    private readonly _getParentsUseCase: IGetParentsUseCase,
    private readonly _addParentUseCase: IAddParentUseCase,
    private readonly _getTeachersUseCase: IGetTeachersUseCase,
    private readonly _addTeacherUseCase: IAddTeacherUseCase,
    private readonly _getTeacherUseCase: IGetTeacherUseCase,
    private readonly _updateTeacherUseCase: IUpdateTeacherUseCase,
    private readonly _updateTeacherStatusUseCase: IUpdateTeacherStatusUseCase,
    private readonly _resendTeacherInvitationUseCase: IResendTeacherInvitationUseCase,
  ) {}

  async getParents(req: ValidatedQueryRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit, search, status } = req.validatedQuery as {
        page: number;
        limit: number;
        search?: string;
        status?: UserStatus;
      };

      const result = await this._getParentsUseCase.execute({
        page,
        limit,
        search,
        status,
      });

      sendSuccess(res, HttpStatusCode.OK, "Parents retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async addParent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addParentUseCase.execute(req.body);

      sendSuccess(res, HttpStatusCode.CREATED, "Parent invitation sent successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async getTeachers(req: ValidatedQueryRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit, search, status } = req.validatedQuery as {
        page: number;
        limit: number;
        search?: string;
        status?: UserStatus;
      };

      const result = await this._getTeachersUseCase.execute({
        page,
        limit,
        search,
        status,
      });

      sendSuccess(res, HttpStatusCode.OK, "Teachers retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async addTeacher(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._addTeacherUseCase.execute(req.body);

      sendSuccess(res, HttpStatusCode.CREATED, "Teacher invitation sent successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async getTeacher(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid teacher id.");
        return;
      }

      if (!Types.ObjectId.isValid(id)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid teacher id.");
        return;
      }

      const result = await this._getTeacherUseCase.execute(id);

      if (!result) {
        sendError(res, HttpStatusCode.NOT_FOUND, "Teacher not found.");
        return;
      }

      sendSuccess(res, HttpStatusCode.OK, "Teacher retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async updateTeacher(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid teacher id.");
        return;
      }

      if (!Types.ObjectId.isValid(id)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid teacher id.");
        return;
      }

      const result = await this._updateTeacherUseCase.execute(id, req.body);

      sendSuccess(res, HttpStatusCode.OK, "Teacher updated successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async updateTeacherStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid teacher id.");
        return;
      }

      if (!Types.ObjectId.isValid(id)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid teacher id.");
        return;
      }

      const result = await this._updateTeacherStatusUseCase.execute(id, req.body);

      sendSuccess(res, HttpStatusCode.OK, "Teacher status updated successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async resendTeacherInvitation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      sendError(
        res,
        HttpStatusCode.BAD_REQUEST,
        "Invalid teacher ID.",
      );
      return;
    }

    if (!Types.ObjectId.isValid(id)) {
      sendError(
        res,
        HttpStatusCode.BAD_REQUEST,
        "Invalid teacher ID.",
      );
      return;
    }

    await this._resendTeacherInvitationUseCase.execute(id);

    sendSuccess(
      res,
      HttpStatusCode.OK,
      "Teacher invitation resent successfully.",
    );
  } catch (error) {
    next(error);
  }
}
}
