import { StudentParentRelationship } from "../../domain/enums/student-parent-relationship.enum";
import { StudentParentStatus } from "../../domain/enums/student-parent-status.enum";

export interface GetStudentParentsResponse {
  id: string;
  parentUserId: string;
  parentName: string;
  email: string;
  phone: string | null;
  relationship: StudentParentRelationship;
  isPrimaryContact: boolean;
  status: StudentParentStatus;
}