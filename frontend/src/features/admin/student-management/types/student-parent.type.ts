export type StudentParentRelationship =
  | "MOTHER"
  | "FATHER"
  | "GUARDIAN"
  | "OTHER";

export type StudentParentStatus = "ACTIVE" | "INACTIVE";

export interface AssignParentToStudentRequest {
  parentUserId: string;
  relationship: StudentParentRelationship;
  isPrimaryContact: boolean;
}

export interface AssignParentToStudentResponse {
  id: string;
  studentId: string;
  parentUserId: string;
  relationship: StudentParentRelationship;
  isPrimaryContact: boolean;
  status: StudentParentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface StudentParentListItem {
  id: string;
  parentUserId: string;
  parentName: string;
  email: string;
  phone: string | null;
  relationship: StudentParentRelationship;
  isPrimaryContact: boolean;
  status: StudentParentStatus;
}

export interface UpdateStudentParentRequest {
  relationship: StudentParentRelationship;
  isPrimaryContact: boolean;
}

export interface UpdateStudentParentStatusRequest {
  status: StudentParentStatus;
}