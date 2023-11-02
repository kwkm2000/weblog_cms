import { axios } from "@/lib/axios";
import { LoginCredentialsDTO } from "@/features/auth/api/login";
import { UserResponse } from "@/features/auth/models";

export async function login(
  loginCredentialsDTO: LoginCredentialsDTO
): Promise<UserResponse> {
  const { username, password } = loginCredentialsDTO;
  const res = await axios.post("/auth/login", { username, password });

  return res.data;
}
