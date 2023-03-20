import { axios } from "@/lib/axios";

import { UserResponse } from "@/features/auth/models";
import { login } from "@/features/auth/repositories/";

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithUsernameAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return login(data);
};
