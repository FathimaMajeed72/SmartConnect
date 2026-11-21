import { StudentParentRelationship } from "../../domain/enums/student-parent-relationship.enum";
import { StudentParentStatus } from "../../domain/enums/student-parent-status.enum";

export interface UpdateStudentParentStatusResponse {
  id: string;
  studentId: string;
  parentUserId: string;
  relationship: StudentParentRelationship;
  isPrimaryContact: boolean;
  status: StudentParentStatus;
  createdAt: Date;
  updatedAt: Date;
}