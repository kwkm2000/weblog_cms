export type AuthUser = {
  name: string;
  password: string;
};

export type UserResponse = {
  jwt: string;
  user: AuthUser;
};
