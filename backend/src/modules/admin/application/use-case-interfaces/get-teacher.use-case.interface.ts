import { TeacherDetails } from "../types/get-teacher-response.type";

export interface IGetTeacherUseCase {
  execute(id: string): Promise<TeacherDetails | null>;
}