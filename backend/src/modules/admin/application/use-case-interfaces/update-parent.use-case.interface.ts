import { UpdateParentRequest } from "../dtos/update-parent.request";
import { UpdateParentResponse } from "../dtos/update-parent.response";

export interface IUpdateParentUseCase {
  execute(
    id: string,
    request: UpdateParentRequest,
  ): Promise<UpdateParentResponse>;
}