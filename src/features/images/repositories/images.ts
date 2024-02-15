import { axios } from "@/lib/axios";
import storage from "@/utils/storage";

const token = storage.getToken();

export type UploadResponse = {
  imageUrl: string;
};

export async function getAll(): Promise<string[]> {
  const response = await axios.get("/images");

  return response.data;
}

export async function uploadImage(formData: FormData): Promise<string> {
  return axios.post("/images", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function remove(key: string): Promise<void> {
  return await axios.delete(`/images/${key}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
