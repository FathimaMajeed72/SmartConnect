import { CreateClassRequest } from "../dtos/create-class.request";
import { CreateClassResponse } from "../dtos/create-class.response";

export interface ICreateClassUseCase {
  execute(request: CreateClassRequest): Promise<CreateClassResponse>;
}