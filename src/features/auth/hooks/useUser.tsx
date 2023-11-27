import { useState, useEffect } from "react";
import { axios } from "@/lib/axios";
import storage from "@/utils/storage";

function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = storage.getToken();
    if (token) {
      console.log("token", token);

      axios
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response", response);
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
