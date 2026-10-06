import { SubjectStatus } from "../../domain/enums/subject-status.enum";

export interface UpdateSubjectStatusRequest {
  status: SubjectStatus;
}