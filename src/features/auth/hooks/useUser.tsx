import { axios } from "@/lib/axios";
import storage from "@/utils/storage";
import useSWR from "swr";

const fetcher = async () => {
  const token = storage.getToken();
  console.log("token", token);
  const response = await axios.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const useUser = () => {
  const { data, error } = useSWR("/auth/me", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
