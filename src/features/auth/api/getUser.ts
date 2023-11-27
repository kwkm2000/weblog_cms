import { axios } from "@/lib/axios";
import { AuthUser } from "@/features/auth/models";
import storage from "@/utils/storage";

export const getUser = async (): Promise<AuthUser | null> => {
  const token = storage.getToken();
  const response = await axios.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
