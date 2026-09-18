export type Role = "ADMIN" | "TEACHER" | "PARENT";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};
