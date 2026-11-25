
export interface ParentChild {
  id: string;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  profileImage?: string;
  classId: string;
  className: string;
  classCode: string;
  academicYear: string;
  batchId?: string;
  batchName?: string;
}