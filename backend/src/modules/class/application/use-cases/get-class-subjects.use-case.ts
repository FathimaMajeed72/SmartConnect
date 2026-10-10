import { IClassRepository } from "../../domain/repositories/class.repository";
import { IClassSubjectRepository } from "../../domain/repositories/class-subject.repository";

import { ClassNotFoundError } from "../errors/class-not-found.error";

import { GetClassSubjectsResponse } from "../dtos/get-class-subjects.response";
import { ClassSubjectDtoMapper } from "../mappers/class-subject-dto.mapper";

import { IGetClassSubjectsUseCase } from "../use-case-interfaces/get-class-subjects.use-case.interface"; 

export class GetClassSubjectsUseCase
  implements IGetClassSubjectsUseCase
{
  constructor(
    private readonly _classRepository: IClassRepository,
    private readonly _classSubjectRepository: IClassSubjectRepository,
  ) {}

  async execute(
    classId: string,
  ): Promise<GetClassSubjectsResponse> {
    const existingClass =
      await this._classRepository.findById(classId);

    if (!existingClass) {
      throw new ClassNotFoundError();
    }

    const classSubjects =
      await this._classSubjectRepository.findDetailsByClassId(
        classId,
      );

    return ClassSubjectDtoMapper.toGetResponse(
      classSubjects,
    );
  }
}