import { GetClassSubjectsResponse } from "../dtos/get-class-subjects.response"; 

export interface IGetClassSubjectsUseCase {
  execute(
    classId: string,
  ): Promise<GetClassSubjectsResponse>;
}