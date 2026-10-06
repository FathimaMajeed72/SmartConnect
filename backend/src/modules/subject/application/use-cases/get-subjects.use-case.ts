import { ISubjectRepository } from "../../domain/repositories/subject.repository";

import { IGetSubjectsUseCase } from "../use-case-interfaces/get-subjects.use-case.interface";

import { GetSubjectsQuery } from "../types/get-subjects-query.type";
import { GetSubjectsResponse } from "../types/get-subjects-response.type";
import { SubjectDtoMapper } from "../mappers/subject-dto.mapper";

export class GetSubjectsUseCase implements IGetSubjectsUseCase {
  constructor(
    private readonly _subjectRepository: ISubjectRepository,
  ) {}

  async execute(
    query: GetSubjectsQuery,
  ): Promise<GetSubjectsResponse> {
    const { page, limit, search, status } = query;

    const result = await this._subjectRepository.findAll(
      page,
      limit,
      search,
      status,
    );

    const totalPages = Math.ceil(result.total / limit);

    return {
      subjects: result.subjects.map(
        (subject) => SubjectDtoMapper.toDetails(subject),
      ),
      page,
      limit,
      total: result.total,
      totalPages,
    };
  }
}