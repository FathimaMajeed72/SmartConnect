import { IClassRepository } from "../../domain/repositories/class.repository";

import { IUpdateClassStatusUseCase } from "../use-case-interfaces/update-class-status.use-case.interface";

import { UpdateClassStatusRequest } from "../dtos/update-class-status.request";
import { UpdateClassStatusResponse } from "../dtos/update-class-status.response";
import { ClassNotFoundError } from "../errors/class-not-found.error";

export class UpdateClassStatusUseCase
  implements IUpdateClassStatusUseCase
{
  constructor(
    private readonly _classRepository: IClassRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateClassStatusRequest,
  ): Promise<UpdateClassStatusResponse> {
    const existingClass =
      await this._classRepository.findById(id);

    if (!existingClass) {
      throw new ClassNotFoundError();
    }

    await this._classRepository.updateStatus(
      id,
      request.status,
    );

    return {
      message: "Class status updated successfully.",
    };
  }
}