import { axios } from "@/lib/axios";
import storage from "@/utils/storage";
import { Images } from "@/features/images/models";

const token = storage.getToken();

export type UploadResponse = {
  imageUrl: string;
};

export function getAll(): Promise<string[]> {
  return axios.get("/images");
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
