import { axios } from "@/lib/axios";

import { UserResponse } from "@/features/auth/models";

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export async function loginWithUsernameAndPassword(
  loginCredentialsDTO: LoginCredentialsDTO
): Promise<UserResponse> {
  const { username, password } = loginCredentialsDTO;
  const res = await axios.post("/auth/login", { username, password });

  return res.data;
}
