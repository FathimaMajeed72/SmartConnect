import { GetClassResponse } from "../dtos/get-class.response";

export interface IGetClassUseCase {
  execute(id: string): Promise<GetClassResponse>;
}