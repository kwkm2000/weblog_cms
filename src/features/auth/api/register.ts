import { axios } from "@/lib/axios";

import { UserResponse } from "../models";

export type RegisterCredentialsDTO = {
  username: string;
  password: string;
};

export const registerWithUsernameAndPassword = (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  const username = prompt("Enter your username:");
  const password = prompt("Enter your password:");

  return axios.post("/auth/register", data, {
    headers: {
      Authorization: `Basic ${username}:${password}`,
    },
  });
};
