import { UpdateParentStatusRequest } from "../dtos/update-parent-status.request";
import { UpdateParentStatusResponse } from "../dtos/update-parent-status.response";

export interface IUpdateParentStatusUseCase {
  execute(
    id: string,
    request: UpdateParentStatusRequest,
  ): Promise<UpdateParentStatusResponse>;
}