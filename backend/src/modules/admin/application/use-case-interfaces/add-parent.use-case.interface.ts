import { AddParentRequest } from "../dtos/add-parent.request";
import { AddParentResponse } from "../dtos/add-parent.response";

export interface IAddParentUseCase {
  execute(request: AddParentRequest): Promise<AddParentResponse>;
}