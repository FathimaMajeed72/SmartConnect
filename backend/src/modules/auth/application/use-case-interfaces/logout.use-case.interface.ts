import { LogoutRequest } from "../dtos/logout.request";
import { LogoutResponse } from "../dtos/logout.response";

export interface ILogoutUseCase {
  execute(request: LogoutRequest): Promise<LogoutResponse>;
}