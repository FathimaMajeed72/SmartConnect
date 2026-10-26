import { GetStudentParentsResponse } from "../dtos/get-student-parents.response";

export interface IGetStudentParentsUseCase {
  execute(studentId: string): Promise<GetStudentParentsResponse[]>;
}