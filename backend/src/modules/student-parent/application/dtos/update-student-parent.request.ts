import { StudentParentRelationship } from "../../domain/enums/student-parent-relationship.enum";

export interface UpdateStudentParentRequest {
  studentId: string;
  parentUserId: string;
  relationship: StudentParentRelationship;
  isPrimaryContact: boolean;
}