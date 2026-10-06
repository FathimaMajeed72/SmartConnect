import { ISubjectRepository } from "../../domain/repositories/subject.repository";

import { GetSubjectResponse } from "../dtos/get-subject.response";

import { SubjectNotFoundError } from "../errors/subject-not-found.error";

import { SubjectDtoMapper } from "../mappers/subject-dto.mapper";

import { IGetSubjectUseCase } from "../use-case-interfaces/get-subject.use-case.interface";

export class GetSubjectUseCase
  implements IGetSubjectUseCase
{
  constructor(
    private readonly _subjectRepository: ISubjectRepository,
  ) {}

  async execute(
    id: string,
  ): Promise<GetSubjectResponse> {
    const subject =
      await this._subjectRepository.findById(id);

    if (!subject) {
      throw new SubjectNotFoundError();
    }

    return SubjectDtoMapper.toGetResponse(subject)
  }
}