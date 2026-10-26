import { IStudentRepository } from "../../domain/repositories/student.repository";
import { IUpdateStudentStatusUseCase } from "../use-case-interfaces/update-student-status.use-case.interface";
import { UpdateStudentStatusRequest } from "../dtos/update-student-status.request";
import { UpdateStudentStatusResponse } from "../dtos/update-student-status.response";
import { StudentNotFoundError } from "../errors/student-not-found.error";
import { StudentDtoMapper } from "../mappers/student-dto.mapper";

export class UpdateStudentStatusUseCase implements IUpdateStudentStatusUseCase {
  constructor(private readonly _studentRepository: IStudentRepository) {}

  async execute(request: UpdateStudentStatusRequest): Promise<UpdateStudentStatusResponse> {


    const updatedStudent = await this._studentRepository.updateStatus(request.id, request.status);

    if (!updatedStudent) {
      throw new StudentNotFoundError();
    }

    return StudentDtoMapper.toDetails(updatedStudent);
  }
}
