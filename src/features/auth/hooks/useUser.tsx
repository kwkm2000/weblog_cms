import { useState, useEffect } from "react";
import { axios } from "@/lib/axios";
import storage from "@/utils/storage";

async function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = storage.getToken();
    if (token) {
      axios
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, []);

  return user;
}

export default useUser;
