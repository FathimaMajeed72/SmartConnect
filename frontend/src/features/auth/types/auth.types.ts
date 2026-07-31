export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};