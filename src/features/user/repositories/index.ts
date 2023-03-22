import { axios } from "@/lib/axios";

export async function login(userName: string, password: string) {
  return await axios.post("/auth/login", { userName, password });
}
