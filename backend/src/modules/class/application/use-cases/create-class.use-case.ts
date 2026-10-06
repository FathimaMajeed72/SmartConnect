import { CreateClassRequest } from "../dtos/create-class.request";
import { CreateClassResponse } from "../dtos/create-class.response";

import { ICreateClassUseCase } from "../use-case-interfaces/create-class.use-case.interface";

import { IClassRepository } from "../../domain/repositories/class.repository";
import { ClassEntity } from "../../domain/entities/class.entity";
import { ClassStatus } from "../../domain/enums/class-status.enum";
import { ClassAlreadyExistsError } from "../errors/class-already-exists.error";

export class CreateClassUseCase implements ICreateClassUseCase {
  constructor(
    private readonly _classRepository: IClassRepository,
  ) {}

  async execute(
    request: CreateClassRequest,
  ): Promise<CreateClassResponse> {

    const existingClass =
      await this._classRepository.findByCodeOrNameAndAcademicYear(
        request.code,
        request.name,
        request.academicYear,
      );
      

    if (existingClass) {
      throw new ClassAlreadyExistsError();
    }

    const classEntity: ClassEntity = {
      id: "",
      name: request.name,
      code: request.code,
      academicYear: request.academicYear,
      description: request.description,
      status: ClassStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdClass =
      await this._classRepository.create(classEntity);

    return {
      message: "Class created successfully.",
      classId: createdClass.id,
    };
  }
}