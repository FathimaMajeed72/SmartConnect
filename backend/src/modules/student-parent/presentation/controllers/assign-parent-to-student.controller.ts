import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { sendError, sendSuccess } from "../../../../shared/presentation/helpers/response.helper";

import { IAssignParentToStudentUseCase } from "../../application/use-case-interfaces/assign-parent-to-student.use-case.interface";
import { IGetStudentParentsUseCase } from "../../application/use-case-interfaces/get-student-parents.use-case.interface";
import { IUpdateStudentParentStatusUseCase } from "../../application/use-case-interfaces/update-student-parent-status.use-case.interface";

export class AssignParentToStudentController {
  constructor(
    private readonly _assignParentToStudentUseCase: IAssignParentToStudentUseCase,
    private readonly _getStudentParentsUseCase: IGetStudentParentsUseCase,
    private readonly _updateStudentParentStatusUseCase: IUpdateStudentParentStatusUseCase,
  ) {}

  async assignParentToStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId } = req.params;

      if (typeof studentId !== "string" || !Types.ObjectId.isValid(studentId)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid student id.");
        return;
      }

      const result = await this._assignParentToStudentUseCase.execute({
        ...req.body,
        studentId,
      });

      sendSuccess(res, HttpStatusCode.CREATED, "Parent assigned to student successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async getStudentParents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId } = req.params;

      if (typeof studentId !== "string" || !Types.ObjectId.isValid(studentId)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid student id.");
        return;
      }

      const result = await this._getStudentParentsUseCase.execute(studentId);

      sendSuccess(res, HttpStatusCode.OK, "Student parents retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async updateStudentParentStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId, parentUserId } = req.params;

      if (typeof studentId !== "string" || !Types.ObjectId.isValid(studentId)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid student id.");
        return;
      }

      if (typeof parentUserId !== "string" || !Types.ObjectId.isValid(parentUserId)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid parent user id.");
        return;
      }

      const result = await this._updateStudentParentStatusUseCase.execute({
        studentId,
        parentUserId,
        status: req.body.status,
      });

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Parent-student relationship status updated successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  }
}
