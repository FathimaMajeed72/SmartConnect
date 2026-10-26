import { StudentDetails } from "../types/get-student-response.type";

export interface IGetStudentUseCase {
  execute(id: string): Promise<StudentDetails>;
}