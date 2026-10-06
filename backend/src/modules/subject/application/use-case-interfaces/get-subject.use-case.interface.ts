import { GetSubjectResponse } from "../dtos/get-subject.response"; 

export interface IGetSubjectUseCase {
  execute(id: string): Promise<GetSubjectResponse>;
}