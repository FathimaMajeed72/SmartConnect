import { GetClassesQuery } from "../types/get-classes-query.type";
import { GetClassesResponse } from "../types/get-classes-response.type";

export interface IGetClassesUseCase {
  execute(query: GetClassesQuery): Promise<GetClassesResponse>;
}