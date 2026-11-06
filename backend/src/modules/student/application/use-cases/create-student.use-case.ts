import { CreateStudentRequest } from "../dtos/create-student.request";
import { CreateStudentResponse } from "../dtos/create-student.response";

import { ICreateStudentUseCase } from "../use-case-interfaces/create-student.use-case.interface";

import { IStudentRepository } from "../../domain/repositories/student.repository";
import { StudentEntity } from "../../domain/entities/student.entity";
import { StudentStatus } from "../../domain/enums/student-status.enum";
import { StudentAlreadyExistsError } from "../errors/student-already-exists.error";

import { StudentDtoMapper } from "../mappers/student-dto.mapper";
import { DuplicateKeyError } from "../../../../shared/errors/duplicate-key.error";
import { IClassRepository } from "../../../class/domain/repositories/class.repository";
import { EntityNotFoundError } from "../../../../shared/errors/entity-not-found.error";

export class CreateStudentUseCase implements ICreateStudentUseCase {
  constructor(
    private readonly _studentRepository: IStudentRepository,
    private readonly _classRepository: IClassRepository,
  ) {}

  async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
    const classEntity = await this._classRepository.findById(request.classId);

    if (!classEntity) {
      throw new EntityNotFoundError("Class");
    }
    const admissionNumber = request.admissionNumber.trim().toUpperCase();

    const existingStudent = await this._studentRepository.findByAdmissionNumber(admissionNumber);

    if (existingStudent) {
      throw new StudentAlreadyExistsError();
    }

    const studentEntity: StudentEntity = {
      id: "",
      admissionNumber,
      firstName: request.firstName.trim(),
      lastName: request.lastName.trim(),
      dateOfBirth: request.dateOfBirth,
      gender: request.gender,
      profileImage: request.profileImage,
      classId: request.classId,
      status: StudentStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let createdStudent: StudentEntity;

    try {
      createdStudent = await this._studentRepository.create(studentEntity);
    } catch (error) {
      if (error instanceof DuplicateKeyError && error.field === "admissionNumber") {
        throw new StudentAlreadyExistsError();
      }

      throw error;
    }

    return StudentDtoMapper.toCreateResponse(createdStudent);
  }
}
