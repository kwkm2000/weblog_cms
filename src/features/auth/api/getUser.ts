import { axios } from "@/lib/axios";
import { AuthUser } from "@/features/auth/models";
import storage from "@/utils/storage";

export const getUser = (): Promise<AuthUser | null> => {
  const token = storage.getToken();

  return axios.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
