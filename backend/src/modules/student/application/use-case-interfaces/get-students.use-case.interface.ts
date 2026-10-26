import { GetStudentsQuery } from "../types/get-students-query.type";
import { GetStudentsResponse } from "../types/get-students-response.type";

export interface IGetStudentsUseCase {
  execute(query: GetStudentsQuery): Promise<GetStudentsResponse>;
}