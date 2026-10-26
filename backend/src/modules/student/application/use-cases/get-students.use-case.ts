import { IStudentRepository } from "../../domain/repositories/student.repository";
import { IGetStudentsUseCase } from "../use-case-interfaces/get-students.use-case.interface";
import { GetStudentsQuery } from "../types/get-students-query.type";
import { GetStudentsResponse } from "../types/get-students-response.type";

export class GetStudentsUseCase implements IGetStudentsUseCase {
  constructor(
    private readonly _studentRepository: IStudentRepository,
  ) {}

  async execute(
    query: GetStudentsQuery,
  ): Promise<GetStudentsResponse> {
    const { page, limit, search, status } = query;

    const result = await this._studentRepository.findAll(
      page,
      limit,
      search,
      status,
    );

    const totalPages = Math.ceil(result.total / limit);

    return {
      students: result.students,
      page,
      limit,
      total: result.total,
      totalPages,
    };
  }
}