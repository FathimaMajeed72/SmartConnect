import { IClassRepository } from "../../domain/repositories/class.repository";

import { IGetClassUseCase } from "../use-case-interfaces/get-class.use-case.interface";

import { GetClassResponse } from "../dtos/get-class.response";
import { ClassNotFoundError } from "../errors/class-not-found.error";

export class GetClassUseCase implements IGetClassUseCase {
  constructor(
    private readonly _classRepository: IClassRepository,
  ) {}

  async execute(id: string): Promise<GetClassResponse> {
    const classEntity = await this._classRepository.findById(id);

    if (!classEntity) {
      throw new ClassNotFoundError();
    }

    return {
      class: classEntity,
    };
  }
}