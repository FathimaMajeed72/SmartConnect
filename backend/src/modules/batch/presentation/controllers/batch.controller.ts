import type { Request, Response, NextFunction } from "express";

import { HttpStatusCode } from "../../../../shared/enums/http-status-code.enum";
import { sendError, sendSuccess } from "../../../../shared/presentation/helpers/response.helper";

import { ICreateBatchUseCase } from "../../application/use-case-interfaces/create-batch.use-case.interface";
import { Types } from "mongoose";
import { IGetBatchesUseCase } from "../../application/use-case-interfaces/get-batches.use-case.interface";
import { IGetBatchUseCase } from "../../application/use-case-interfaces/get-batch.use-case.interface";
import { IUpdateBatchUseCase } from "../../application/use-case-interfaces/update-batch.use-case.interface";
import { IUpdateBatchStatusUseCase } from "../../application/use-case-interfaces/update-batch-status.use-case.interface";
import { IGetAvailableClassTeachersUseCase } from "../../application/use-case-interfaces/get-available-class-teachers.use-case.interface";

export class BatchController {
  constructor(
    private readonly _createBatchUseCase: ICreateBatchUseCase,
    private readonly _getBatchesUseCase: IGetBatchesUseCase,
    private readonly _getBatchUseCase: IGetBatchUseCase,
    private readonly _updateBatchUseCase: IUpdateBatchUseCase,
    private readonly _updateBatchStatusUseCase: IUpdateBatchStatusUseCase,
    private readonly _getAvailableClassTeachersUseCase: IGetAvailableClassTeachersUseCase,
  ) {}

  async createBatch(
    req: Request<{ classId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { classId } = req.params;

      if (!Types.ObjectId.isValid(classId)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid class id.");
        return;
      }

      const result = await this._createBatchUseCase.execute(classId, req.body);

      sendSuccess(res, HttpStatusCode.CREATED, "Batch created successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async getBatches(
    req: Request<{ classId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { classId } = req.params;

      if (!Types.ObjectId.isValid(classId)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid class ID.");
        return;
      }

      const result = await this._getBatchesUseCase.execute(classId);

      sendSuccess(res, HttpStatusCode.OK, "Batches retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async getBatch(
    req: Request<{ classId: string; batchId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { classId, batchId } = req.params;

      if (!Types.ObjectId.isValid(classId) || !Types.ObjectId.isValid(batchId)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid class ID or batch ID.");
        return;
      }

      const result = await this._getBatchUseCase.execute(classId, batchId);

      sendSuccess(res, HttpStatusCode.OK, "Batch retrieved successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async updateBatch(
    req: Request<{ classId: string; batchId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { classId, batchId } = req.params;

      if (!Types.ObjectId.isValid(classId) || !Types.ObjectId.isValid(batchId)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid class ID or batch ID.");
        return;
      }

      const result = await this._updateBatchUseCase.execute(classId, batchId, req.body);

      sendSuccess(res, HttpStatusCode.OK, "Batch updated successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async updateBatchStatus(
    req: Request<{ classId: string; batchId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { classId, batchId } = req.params;

      if (!Types.ObjectId.isValid(classId) || !Types.ObjectId.isValid(batchId)) {
        sendError(res, HttpStatusCode.BAD_REQUEST, "Invalid class ID or batch ID.");
        return;
      }

      console.log("CONTROLLER REQUEST BODY:", req.body);

      const result = await this._updateBatchStatusUseCase.execute(classId, batchId, req.body);

      sendSuccess(res, HttpStatusCode.OK, "Batch status updated successfully.", result);
    } catch (error) {
      next(error);
    }
  }

  async getAvailableClassTeachers(_req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log("GET AVAILABLE CLASS TEACHERS CONTROLLER CALLED");
    try {
      const result = await this._getAvailableClassTeachersUseCase.execute();

      sendSuccess(
        res,
        HttpStatusCode.OK,
        "Available class teachers retrieved successfully.",
        result,
      );
    } catch (error) {
      next(error);
    }
  } 
}
