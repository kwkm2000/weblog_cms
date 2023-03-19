import { axios } from "@/lib/axios";
import { AuthUser } from "@/features/auth/models";

export const getUser = (): Promise<AuthUser> => {
  return axios.get("/auth/me");
};
