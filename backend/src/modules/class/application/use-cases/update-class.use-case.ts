import { IClassRepository } from "../../domain/repositories/class.repository";

import { IUpdateClassUseCase } from "../use-case-interfaces/update-class.use-case.interface";

import { UpdateClassRequest } from "../dtos/update-class.request";
import { UpdateClassResponse } from "../dtos/update-class.response";
import { ClassNotFoundError } from "../errors/class-not-found.error";

export class UpdateClassUseCase implements IUpdateClassUseCase {
  constructor(
    private readonly _classRepository: IClassRepository,
  ) {}

  async execute(
    id: string,
    request: UpdateClassRequest,
  ): Promise<UpdateClassResponse> {
    const existingClass =
      await this._classRepository.findById(id);

    if (!existingClass) {
      throw new ClassNotFoundError();
    }

    const updatedClass = {
      ...existingClass,
      name: request.name,
      code: request.code,
      description: request.description,
      updatedAt: new Date(),
    };

    await this._classRepository.update(updatedClass);

    return {
      message: "Class updated successfully.",
    };
  }
}