import { axios } from "@/lib/axios";
import storage from "@/utils/storage";

const token = storage.getToken();

export type UploadResponse = {
  imageUrl: string;
};

export async function uploadImage(formData: FormData): Promise<string> {
  return axios.post("/images", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
