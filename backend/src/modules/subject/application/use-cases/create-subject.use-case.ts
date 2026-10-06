import { ISubjectRepository } from "../../domain/repositories/subject.repository";
import { CreateSubjectRequest } from "../dtos/create-subject.request";
import { CreateSubjectResponse } from "../dtos/create-subject.response";
import { SubjectCodeAlreadyExistsError } from "../errors/subject-code-already-exists.error";
import { SubjectDtoMapper } from "../mappers/subject-dto.mapper";
import { ICreateSubjectUseCase } from "../use-case-interfaces/create-subject.use-case.interface";

export class CreateSubjectUseCase implements ICreateSubjectUseCase {
  constructor(
    private readonly _subjectRepository: ISubjectRepository,
  ) {}

  async execute(
    request: CreateSubjectRequest,
  ): Promise<CreateSubjectResponse> {
    const existingSubject = await this._subjectRepository.findByCode(
      request.code,
    );

    if (existingSubject) {
      throw new SubjectCodeAlreadyExistsError();
    }

    const subject = SubjectDtoMapper.toEntity(request);
    
    const createdSubject =
      await this._subjectRepository.create(subject);

    return SubjectDtoMapper.toCreateResponse(
      createdSubject,
    );
  }
}