import { IStudentRepository } from "../../domain/repositories/student.repository";
import { IGetStudentUseCase } from "../use-case-interfaces/get-student.use-case.interface";
import { StudentNotFoundError } from "../errors/student-not-found.error";
import { StudentDtoMapper } from "../mappers/student-dto.mapper";
import { StudentDetails } from "../types/get-student-response.type";

export class GetStudentUseCase implements IGetStudentUseCase {
  constructor(
    private readonly _studentRepository: IStudentRepository,
  ) {}

  async execute(id: string): Promise<StudentDetails> {
    const student = await this._studentRepository.findById(id);

    if (!student) {
      throw new StudentNotFoundError();
    }

    return StudentDtoMapper.toDetails(student);
  }
}