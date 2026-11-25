export interface GetParentChildrenResponse {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  profileImage?: string;
  classId: string;
  className: string;
  classCode: string;
  academicYear: string;
  batchId?: string;
  batchName?: string;
}