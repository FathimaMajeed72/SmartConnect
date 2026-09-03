import { LoginRequest } from "../dtos/login.request";
import { LoginResponse } from "../dtos/login.response";

export interface ILoginUseCase {
  execute(request: LoginRequest): Promise<LoginResponse>;
}