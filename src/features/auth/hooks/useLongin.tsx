import { useState } from "react";
import axios from "axios";

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/login", { username, password });
      const { jwt, user } = response.data;
      localStorage.setItem("token", jwt);
      setUser(user);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, user };
}

export default useLogin;
