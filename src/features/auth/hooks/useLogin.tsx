import { useState } from "react";
import { axios } from "@/lib/axios";
import { mutate } from "swr";
import storage from "@/utils/storage";


type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (loginCredential: LoginCredentialsDTO) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/auth/login", loginCredential);
      const { jwt, user } = response.data;
      storage.setToken(jwt);
      setUser(user);
      // 返り値でuserのキャッシュを更新する
      mutate('/auth/me', user);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, user };
}
