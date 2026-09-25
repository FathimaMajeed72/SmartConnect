import { ClassStatus } from "../../domain/enums/class-status.enum";

export interface UpdateClassStatusRequest {
  status: ClassStatus;
}