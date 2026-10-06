import { GetSubjectsQuery } from "../types/get-subjects-query.type";
import { GetSubjectsResponse } from "../types/get-subjects-response.type";

export interface IGetSubjectsUseCase {
  execute(query: GetSubjectsQuery): Promise<GetSubjectsResponse>;
}