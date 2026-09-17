export interface UpdateTeacherRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  qualification: string;
  joiningDate: string;
}