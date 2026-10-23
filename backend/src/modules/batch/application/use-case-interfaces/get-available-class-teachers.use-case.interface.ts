import { AvailableClassTeacherResponse } from "../dtos/available-class-teacher.response"; 

export interface IGetAvailableClassTeachersUseCase {
  execute(): Promise<AvailableClassTeacherResponse[]>;
}